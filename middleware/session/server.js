const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const isAdmin =  require('./checkSession')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//session middleware
app.use(session({
  secret: 'admin',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  httpOnly: true,//only transmit cookie over https
  secure: true,//prevents client side js reading the cookies
  store: new MemoryStore({
    checkPeriod: 86400000
  })
}))

app.get('/',  (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/login',  (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'))
})

app.post('/login',  (req, res) => {
  if (req.body.username == 'Mesto' && req.body.password == '111') {
    req.session.auth = req.body.username//set session as auth
    res.redirect('/admin')
  }
})

//check admin
app.get('/admin', isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '/admin.html'))
})

app.get('/logout',  (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/')
  })
})

app.listen(3000, () => {
  console.log('Server is running...')
})
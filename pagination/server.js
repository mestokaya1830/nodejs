const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const memorystore = require('memorystore')(session)
const homeRouter = require('./routers/homeRouter')
const personsRouter = require('./routers/personsRouter')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const db = require('./modules/db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'static')))


// app.set('views', path.join(__dirname, 'templates'))//custom folder
app.set('view engine','pug')//default

app.use(require('connect-flash')())
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.locals.moment = require('moment')

app.use(session({
  secret: 'admin',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  httpOnly: true,//only transmit cookie over https
  secure: true,//prevents client side js reading the cookies
  store: new memorystore({
    checkPeriod: 86400000
  })
}))

app.use('/', homeRouter)
app.use('/admin', personsRouter)

app.use((req, res, next) => {
  res.render('error')
  next()
})

app.set('port', port)
app.listen(port, host,() => {
  console.log('Server is running...')
})

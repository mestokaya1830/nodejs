import express from 'express'
const app = express()
import path from 'path'
import session from 'express-session'
import MongoStore from 'connect-mongo'

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//session middleware
app.use(session({
  secret: 'admin',
  resave: true,
  saveUninitialized: false,//delete cookie on browser when expired
  rolling: true,//refresh cookie-time when user reactivate with server
  cookie: { 
    maxAge: 1 * 60000,
    httpOnly: false,//prevents client side js reading the cookies,
    secure: false,//only transmit cookie over https
  },//1 minute
  //cookie: { maxAge: 1 * 3600000},//1 hour
  // cookie: { maxAge: 24 * 3600000},//1 day
  store: MongoStore.create({//resave the session when server restart
    mongoUrl: 'mongodb://mesto:MK1972mk11130113@localhost:27017/works?authSource=works',
    autoRemove: 'native'
  })
}))

//go index page
  app.get('/',  (req, res) => {
    res.sendFile(path.resolve('./index.html'))
  })
//go login page
  app.get('/login',  (req, res) => {
    res.sendFile(path.resolve('./login.html'))
  })
//post check login
  app.post('/login',  (req, res) => {
    if (req.body.username == 'mesto' && req.body.password == '9090') {
      req.session.auth = req.body.username//set sesstion as auth
      res.redirect('/admin')
    } else {
      res.redirect('/login')
    }
  })
//check admin
  app.get('/admin',(req, res) => {
    console.log(req.session)
    if(req.session.auth){
      res.sendFile(path.resolve('./admin.html'))
    }else{
      res.redirect('/login')
    }
  })
//logout
  app.get('/logout',  (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/login')
    })
  })
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...')
})

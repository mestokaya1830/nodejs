const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());

//go index page
  app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
  })
//go login page
  app.get('/login',  (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'))
  })
//post check login
  app.post('/login',  (req, res) => {
    if (req.body.username == 'mesto' && req.body.password == '9090') {
      const users = {
        name:'mesto',
        age:50
      }
      res.cookie('user', users, {
        // maxAge: 10000, //or use expires
        maxAge: new Date('26 september 2021'),
        httpOnly: true, //not access in browser from javascript
        secure: false //not force to https
      })
     
      res.redirect('/admin')
    } else {
      res.redirect('/login')
    }
  })
//check admin
  app.get('/admin',(req, res) => {
    console.log(req.cookies['user'])
    res.json('Hello')
    // if(req.session.auth){
    //   res.sendFile(path.join(__dirname, '/admin.html'))
    // }else{
    //   res.redirect('/login')
    // }
  })
//logout
  app.get('/logout',  (req, res) => {
    // req.session.destroy((err) => {
    //   res.redirect('/')
    // })
  })
app.listen(process.env.PORT || 3000)

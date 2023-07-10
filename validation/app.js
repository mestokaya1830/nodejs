
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const wrapAsync = require('./wrapasync.js')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret')
const formValidate = require('./formValidation')
const isAdmin = require('./isAdmin')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

Router.get('/users', isAdmin, wrapAsync(async(req, res) => {
  res.json({user:'Mesto'})
}))

Router.post('/register', wrapAsync(async(req, res) => {
  const errors = formValidate(req.body.name, req.body.password)
  if(errors.length > 0){
    req.json({errors:errors[0].message})
  }else{
    const newUser =  new Users({
      name: req.body.name, 
      password: cryptr.encrypt(req.body.password)
    })
    res.json({newUser})
  }
}))

Router.post('/login', wrapAsync(async(req, res) => {
  const loginUser = await Users.find({name: req.body.name})
  if(loginUser.length > 0){
    let dePass = cryptr.decrypt(loginUser[0].password)
    if(req.body.password == dePass){
      req.session.admin = loginUser[0].name
      res.redirect('/admin/users')
    }else{
      req.flash('danger','Password not match')
      res.render('login', {name:req.body.name,password: req.body.password})
    }
  }else{
    req.flash('danger','User not found')
    res.redirect('/login')
  }
}))

app.use((error, req, res, next) => {
  res.render('error', {error})
})

//listen server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listen...')
})
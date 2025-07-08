import express from 'express'
const app = express()
import expressLayouts from 'express-ejs-layouts'
import './models/db.js'
import fileUpload from 'express-fileupload'
import Users from './models/usersSC.js'
import flash from 'connect-flash'
import session from  'express-session'
import tryCatch from './models/tryCatch.js'
import path from 'path'
import fs from 'fs'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))
app.use(flash())
app.use(fileUpload())

app.use(expressLayouts)
app.set('view engine', 'ejs')


//session middleware
app.use(session({
  secret: 'admin',
  resave: true,
  saveUninitialized: false,//delete cookie on browser when expired
  rolling: true,//refresh cookie-time when user reactivate with server
  cookie: { 
    // maxAge: 1 * 60000,
    httpOnly: true,//prevents client side js reading the cookies,
    secure: false,//only transmit cookie over https
  },//1 minute
}))

app.get('/', tryCatch(async(req, res) => {
  const result = await Users.find({})
  res.render('home', {
    title: 'Home Page',
    users: result
  })
}))

//du you need to falsh only with redirect you cant send data with redirect without flash
app.get('/register', tryCatch(async(req, res) => {
  const user = req.flash('user')
  res.render('register', {title: 'Register Page', user: user})
}))

app.post('/register',tryCatch(async(req, res) => {
  const file = req.files.file
  const newUser = new Users({
    name: req.body.user,
    password: req.body.password,
    image: file.name
  })
  await newUser.save()
  await file.mv(path.resolve('static/uploads', file.name))
  req.flash('user', req.body.user) 
  res.redirect('/register')
}))

app.get('/edit/:id', tryCatch(async(req, res) => {
  const result = await Users.findOne({_id: req.params.id})
  res.render('edit', {
    title: 'Edit User',
    user: result
  })
}))

app.post('/edit/:id', tryCatch(async(req, res) => {
  await Users.updateOne({_id: req.params.id}, {$set: {password: req.body.password}})
  res.redirect('/')
}))

app.post('/delete/:id', tryCatch(async(req, res) => {
  const findUser = await Users.findOne({_id: req.params.id})
  await Users.deleteOne({_id: req.params.id})
  const imagePath = './static/uploads/'+findUser.image
  if (fs.existsSync(imagePath)){
    fs.rmSync(imagePath, { recursive: true }, () => {
      res.json({code:200})
    })
  } else {
    res.json({code: 400, message:'Sorry no images to remove!'})
  }
  res.redirect('/')
}))


app.use((req, res) => {
  res.status(404).send('Page Not Found')
})

app.use((error, req, res, next) => {
  res.status(500).json(error)
  next()
})

app.listen(3000, () => console.log('Server is running...'))
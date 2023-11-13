const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const Router = require('./routes/indexRoute.js')
const responseTime = require('./middleware/responseTime')

app.use(responseTime)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

app.set('view engine','pug')

//session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

//flash middleware
app.use(require('connect-flash')())

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use('/', Router)

//listen server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listen...')
})
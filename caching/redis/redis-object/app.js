const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const dotenv = require('dotenv')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const homeRouter = require('./routers/homeRouter.js')
const usersRouter = require('./routers/usersRouter.js')
const responseTime = require('./middleware/responseTime')

dotenv.config()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'static')))
app.use(responseTime);

app.set('view engine','pug')

//first install connect-flash and express-messages
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
  store: new MemoryStore({
    checkPeriod: 86400000
  })
}))

app.use('/', homeRouter)
app.use('/', usersRouter)

app.use((error, req, res, next) => {
  console.log(error)
  next()
})

//listen server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listen...')
})
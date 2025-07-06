import express from  'express'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import fileUpload from 'express-fileupload'
import path from 'path'
import authRouter from './router/authRouter.js'
import clientPostRouter from './router/clientPostRouter.js'
import adminPostRouter from './router/adminPostRouter.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import i18next from 'i18next';
import Backend from 'i18next-fs-backend'
import middleware from 'i18next-http-middleware'

import 'dotenv/config'
import './models/db.js'
const app = express()

i18next
.use(Backend)
.use(middleware.LanguageDetector)
.init({
  fallbackLng: "en",//select language from browser
  backend:{
    loadPath: "./locales/{{lng}}/translation.json"
  }
});
app.use(middleware.handle(i18next))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(mongoSanitize())
app.use(express.static('public'))
app.use(fileUpload())

app.use(session({
  name:'secret_name',
  secret: 'secret_key',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: { 
  maxAge: 12 * 3600000,
    httpOnly: true,
    secure: false,
  },//12 hour
  store: MongoStore.create({
    mongoUrl: process.env.MONGO,
    autoRemove: 'native'
  })
}))

app.use('/api', authRouter)
app.use('/api/client/', clientPostRouter)
app.use('/api/admin/', adminPostRouter)

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'))
  })
}

app.use((req, res) => {
  res.status(404).send('Page Not Found!')
})

app.use((error, req, res, next) => {
  console.log(error)
  res.status(200).json(error)
  next()
})

app.listen(process.env.PORT, () => console.log('Server is running...'))

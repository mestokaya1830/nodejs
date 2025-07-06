import express from "express";
const app = express()
import path from 'path'
import dotenv from 'dotenv'
import db from './modules/db.js'
import session from 'express-session'
import helmet from 'helmet'
import MongoStore from 'connect-mongo'
import githubRouter from './routers/githubRouter.js'
import googleRouter from './routers/googleRouter.js'

dotenv.config()
app.use(helmet())
app.use(express.json())
app.use(express.static('public'))//for deveopment


app.use(session({
  name:'secret_name',
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 12 * 3600000},//12 hour
  httpOnly: true,
  secure: true,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://mesto:MK1972mk11130113@localhost:27017/works?authSource=works',
    autoRemove: 'native'
  })
}))

app.use('/api/github/', githubRouter)
app.use('/api/google/', googleRouter)

//must be after route
if(process.env.NODE_ENV == 'production'){
  app.use(express.static('dist'))
  app.get('*', (req, res) => res.sendFile(path.resolve('dist/index.html')))
}

app.use((err, req, res, next) => {
  console.log(err)
  next(err)
})

app.listen(process.env.PORT, () => {
  console.log('Server is running...' + process.env.PORT)
})

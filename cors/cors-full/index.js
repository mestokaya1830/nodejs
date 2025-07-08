import express from "express";
const app = express()
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './modules/db.js'
import Users from './modules/userSchema.js'
import Wrap from './middleware/tryCatch.js'
import session from 'express-session'
import helmet from 'helmet'
// import memorystore from 'memorystore'
// const MemoryStore = memorystore(session)
// const cacheControl = (req, res, next) => {
//   const period = 60 * 1 //5 minutes
//   if(req.method == 'GET'){
//     res.set("Cache-control", `public, max-age=${period}`)
//   } else {
//     res.set("Cache-control" ,'no-store')
//   }
//   next()
// }
// app.use(cacheControl)
dotenv.config()


//cors package setting
// app.use(cors({
//   origin: "http://localhost:5173",//or 'http://localhost:5173'
//   methods: ["GET,HEAD,PUT,PATCH,OPTIONS,POST,DELETE"],
//   preflightContinue: true,
//   optionsSuccessStatus: 204
// }))


//nadtive cors middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  // res.header('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,OPTIONS,DELETE")
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, access-control-allow-origin')
  if ('OPTIONS' == req.method) res.send(200);
    else next();
})
app.use(express.json())
app.use(express.static('public'))//for deveopment

app.use(session({
  secret: 'admin',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  httpOnly: true,//only transmit cookie over https
  secure: true,//prevents client side js reading the cookies
  // store: new MemoryStore({
  // checkPeriod: 86400000
  // })
}))

app.get('/api/users', async(req, res) => {//gere must take roue not so ('/')
  req.session.auth = 'Mesto'
  const users = await Users.find({}).sort({_id:-1})
  res.json(users)
})

app.post('/api/newuser', Wrap(async(req, res) => {
  console.log(req.session)
  const newUser = await new Users(req.body.newuser)
  await newUser.save()
  res.json('Saved')
}))
app.post('/api/deleteuser', Wrap(async(req, res) => {
  await Users.deleteOne({_id:req.body.userID})
  res.json('Deleted')
}))



//must be after route
if(process.env.NODE_ENV == 'production'){
  app.use(express.static('dist'))
  app.get('*', (req, res) => res.sendFile(path.resolve('dist/index.html')))
}

app.listen(process.env.PORT, () => {
  console.log('Server is running...' + process.env.PORT)
})

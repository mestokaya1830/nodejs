import express from "express";
const app = express()
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './modules/db.js'
import Users from './modules/userSchema.js'
import Wrap from './middleware/tryCatch.js'

const cacheControl = (req, res, next) => {
  const period = 60 * 1 //5 minutes
  if(req.method == 'GET'){
    res.set("Cache-control", `public, max-age=${period}`)
  } else {
    res.set("Cache-control" ,'no-store')
  }
  next()
}
app.use(cacheControl)
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))//for deveopment


app.get('/api/users', async(req, res) => {//gere must take roue not so ('/')
  const users = await Users.find({}).sort({_id:-1})
  res.json(users)
})

app.post('/api/newuser', Wrap(async(req, res) => {
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

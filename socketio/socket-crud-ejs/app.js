import express from 'express'
import cors from 'cors'
const app = express()
import ejs from 'ejs'

import db  from './module/db.js'
import Users from './module/UsersSchema.js'

import http from 'http'
import { Server } from "socket.io"
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/users', (req, res) => {
  res.render('users')
})

io.on('connection', (socket) => {
  
  console.log('a user connected')
  
  socket.on('get-users', async() => {
    const result = await Users.find()
    io.emit('send-users', result)
  })

  socket.on('add-user', async(user) => {
    const newUser = new Users(user)
    await newUser.save()
    //get user here or on frontend with emit getsuers
    // const result = await Users.find()
    // io.emit('send-users', result)
  })
  socket.on('update-password', async(data) => {
    await Users.updateOne({_id:data.id}, {$set:{password:data.password}})
  })
  socket.on('delete-user', async(id) => {
    await Users.deleteOne({_id:id})
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.use((error, req, res, next) => {
  console.log(error)
  next()
})

server.listen(3000, () => {
  console.log('Server is runinng...')
})

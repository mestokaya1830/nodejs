import express from 'express'
import cors from 'cors'
const app = express()
import path from 'path'

import http from 'http'
import { Server } from "socket.io"
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.get('/users', (req, res) => {
  res.sendFile(path.resolve('users.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('get-users', () => {
    const users = {
      name:'Mesto',
      lastname:'Kaya',
      age:50
    }
    io.emit('set-users', users)
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

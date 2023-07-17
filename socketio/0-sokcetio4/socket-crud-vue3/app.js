import express from 'express'
import cors from 'cors'
const app = express()


import http from 'http'
import { Server } from "socket.io"

const server = http.createServer(app)
const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173" //give permission to client
  }
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json("message: Hello")
})


io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('message', (data) => {
    console.log(data)
    io.emit('message', data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3000, () => {
  console.log('Server is running...')
})
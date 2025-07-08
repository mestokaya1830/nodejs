import express from 'express'
const app = express()

import http from 'http'
import { Server } from "socket.io"
const server = http.createServer(app)
const io = new Server(server)


app.get('/' , (req , res)=>{
   res.send('Chat-Vue')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.use((error, req, res, next) => {
  console.log(error)
  next()
})

app.listen(3000, () => {
  console.log('Server is running...')
})
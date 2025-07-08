const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'static')))

let users = []
io.on('connection', (socket) => {
  
  socket.on('room', (data) => {
    users.push({room: data.room, user: data.user, id: socket.id})
    console.log(users)
    socket.join(data.room)
    socket.broadcast.to(data.room).emit('msg', `${data.user} has joined the chat`)
    io.to(data.room).emit('room', data)
  })

  socket.on('msg', (data) => {
    io.to(data.room).emit('msg', data)
  })

  socket.on('disconnect', () => {
    const user = users.find(item => item.id === socket.id)
    if(user){
      socket.broadcast.to(user.room).emit('msg', `${user.user} has left the chat`)
    }
  })
})

server.listen(3000, () => {
  console.log('Server is running...')
})
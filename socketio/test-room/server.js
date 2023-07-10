const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
const {userJoin, getCurrentUser, userLeave, getRoomUsers, formatMessage} = require('./static/users')

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const botName = 'Chat Room'

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)
    socket.broadcast.to(user.room).emit('message',
      formatMessage(botName, `${user.username} has joined the chat`)
    )
    io.to(user.room).emit('joinRoom', {room: user.room,users: getRoomUsers(user.room)})
  })

  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    if (user) {
      io.to(user.room).emit('message',
        formatMessage(botName, `${user.username} has left the chat`)
      )
      io.to(user.room).emit('roomUsers', {room: user.room,users: getRoomUsers(user.room)})
    }
  })
})

server.listen(3000, () => {
  console.log('Server running...')
})

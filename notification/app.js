const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('A user is connected!')

  socket.on('client-side', (data) => {
    io.emit('server-side', data)
  })
  socket.on('disconnect', () => {
    console.log('A user is disconnected!')
  })
})
http.listen(3000, () => {
  console.log('Server is running...')
})
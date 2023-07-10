const io = require('socket.io')(3000)

io.on('connection', (socket) => {
  socket.on('clientmsg', (data) => {
    io.emit('servermsg', data)
  })
})
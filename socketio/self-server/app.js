import { Server } from "socket.io";
const io = new Server(3000, {
  cors: {
    origin: "http://127.0.0.1:5500" //give permission to client
  }
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
console.log('Started')
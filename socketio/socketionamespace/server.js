const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const server = require('http').createServer(app)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const io = require('socket.io')(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.set('port', port)
server.listen(port, host)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})
app.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, './chat/chat.html'))
})
app.get('/chat2', function (req, res) {
  res.sendFile(path.join(__dirname, './chat2/chat.html'))
})

//namespace chat
const ns = io.of('/chat')
ns.on('connection',(socket) =>{
  console.log('Connected')

  socket.on('clientmsg', (data) =>{
    ns.emit('servermsg', data)
  })

  socket.on('disconnect', () =>{
    console.log('Disconnected')
  })
})
//namespace chat 2
const ns2 = io.of('/chat2')
ns2.on('connection',(socket) =>{
  console.log('Connected')

  socket.on('clientmsg', (data) =>{
    ns2.emit('servermsg', data)
  })

  socket.on('disconnect', () =>{
    console.log('Disconnected')
  })
})
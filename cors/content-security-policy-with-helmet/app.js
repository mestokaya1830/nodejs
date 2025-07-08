import express from 'express'
const app = express()
import http from 'http'
import { Server } from "socket.io"
import helmet from 'helmet'

const server = http.createServer(app)
const io = new Server(server)

app.use(helmet({
  contentSecurityPolicy: {
    directives:{
      "script-src":["'self'","cdn.jsdelivr.net"]
    }
  }
}))
app.use(express.json())
app.use(express.static("public"))
  
server.listen(3000, () => {
  console.log('Server is running...')
})



const candidates = {
    "0": { votes: 0, label: "JavaScript", color: randomRGB() },
    "1": { votes: 0, label: "C#", color: randomRGB() },
    "2": { votes: 0, label: "PHP", color: randomRGB() },
    "3": { votes: 0, label: "Python", color: randomRGB() },
    "4": { votes: 0, label: "Go", color: randomRGB() }
}

io.on("connection", (socket) => {
    io.emit("update", candidates)
    socket.on("vote", (index) => {
        if (candidates[index]) {
            candidates[index].votes += 1
        }
        console.log(candidates)
        io.emit("update", candidates)
    })
})

function randomRGB() {
    const r = () => Math.random() * 256 >> 0
    return `rgb(${r()}, ${r()}, ${r()})`
}
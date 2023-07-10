const express = require("express")
const app = express()
const cors = require('cors')
const helmet = require('helmet')

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use(helmet())//must be after static line for security content policy

const server = app.listen(3000, () => {
  console.log('Server is running...')
})


const io = require("socket.io")(server)
const randomRGB = () => '#' + Math.floor(Math.random()*16777215).toString(16)
const candidates = {
    "0": { votes: 0, label: "JavaScript", color: randomRGB() },
    "1": { votes: 0, label: "C#", color: randomRGB() },
    "2": { votes: 0, label: "PHP", color: randomRGB() },
    "3": { votes: 0, label: "Python", color: randomRGB() },
    "4": { votes: 0, label: "Go", color: randomRGB() }
}

io.on("connection", (socket) => {
  socket.on("vote", (index) => {
    if (candidates[index]) {
        candidates[index].votes += 1
    }
    io.emit("update", candidates)
  })
  
  io.emit("update", candidates)
})

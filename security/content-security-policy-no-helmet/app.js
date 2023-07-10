const express = require("express")
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.static("public"))

//must be after static line for content security policy
app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; script-src 'self' https://code.jquery.com https://cdnjs.cloudflare.com https://stackpath.bootstrapcdn.com https://cdn.jsdelivr.net; style-src 'self' https://stackpath.bootstrapcdn.com https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; img-src 'self'; frame-src 'self' script-src 'sha256-V+/U3qbjHKP0SaNQhMwYNm62gfWX4QHwPJ7We1PXokI='"
  )
  next()
})
  
const server = app.listen(3000, () => {
  console.log('Server is running...')
})


const io = require("socket.io")(server)
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
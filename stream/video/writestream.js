const fs = require("fs")
const rs = fs.createReadStream("./readed-video.mp4")
const ws = fs.createWriteStream("./new1.mp4")//create new from readed video

fs.stat("./readed-video.mp4", (err, data) => {
  const total = data.size
  let prograss = 0

  rs.on("data", (buffer) => {
    console.log("read...")
    prograss += buffer.length
    console.log(Math.round((100 * prograss) / total) + "%")
  })
  
  rs.on("end", () => {
    console.log("Read stream ended!")
  })

  rs.pipe(ws)
  ws.on("finish", () => {
    console.log("New video created!")
  })
})
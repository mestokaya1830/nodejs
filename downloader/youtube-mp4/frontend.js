const express = require('express')
const app = express()
const cors = require('cors')
const ytdl = require('ytdl-core')
app.use(cors())
app.use(express.json())

app.get('/video', (req, res) => {
  var url = "https://www.youtube.com/watch?v=0XyNv5aOPRE&ab_channel=lennonSystems"
  res.header("Content-Disposition", 'attachment; filename="Video.mp4')
  const video = ytdl(url, {
    quality: 18,
    format: 'mp4'
  }).pipe(res)
  
  video.on('progress', function(info) {
    console.log('Download progress')
  })
  
  video.on('end', function(info) {
    console.log('Download finish')
  })
})


app.listen(3000, () => {
  console.log('Server is running...')
})
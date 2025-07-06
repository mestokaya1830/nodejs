import express from 'express'
import helmet from 'helmet'
import fs from 'fs'
import 'dotenv/config'
import tryCatch from './tryCatch.js'
const app = express()


app.use(helmet())
app.use(express.json())
app.use(express.static('static'))

const videoPath = './video.mp4'
app.get('/', (req, res) => {
  res.sendFile('index.html')
})
app.get('/rangemovie', tryCatch((req, res) => {
  let range = req.headers.range
  if(!range){
    range = 'bytes=0-'
  }
  
  const size = fs.statSync(videoPath).size
  const chunk_size = 5*10**5 //500 kb
  const start = Number(range.replace(/\D/g, ""))
  const end = Math.min(start + chunk_size, size-1)
  const content_length = end - start + 1
  console.log(content_length)

  const headers = {
    "Content-Range":`bytes ${start}-${end}/${size}`,
    "Accept-Ranges":'bytes',
    "Content-Length":content_length,
    "Content-Type":'video/mp4'
  }
  res.writeHead(206, headers)
  const video_stream = fs.createReadStream(videoPath, {start, end})
  video_stream.pipe(res)
}))

//with flat you cant move video stream forward or back
app.get('/flatmovie', tryCatch((req, res) => {
  res.set("Content-Type","video/mp4")
  res.set("Content-Length", fs.statSync(videoPath).size)
  fs.createReadStream(videoPath).pipe(res)
}))

app.get('/downloadmovie', tryCatch((req, res) => {
  res.setHeader('Content-disposition', 'attachment; filename=' + 'test.mp4');
  res.setHeader('Content-type', 'video/mp4');
  fs.createReadStream(videoPath).pipe(res)
}))

app.get('/writemovie', tryCatch((req, res) => {
  fs.createReadStream(videoPath).pipe(fs.createWriteStream('./test.mp4')).on('finish', () => {
    res.status(200).send('Saved')
  })
}))

app.use((err, req, res, next) => {
  console.log(err)
  next()
})
app.listen(process.env.PORT, () => {
  console.log('Server is running...')
})

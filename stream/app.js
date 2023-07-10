import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
const app = express()
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})
app.get('/playvideo', (req, res) => {
  let range = req.headers.range
  if(!range){
    range = 'bytes=0-'
  }
  const path = './video1.mp4'
  const size = fs.statSync(path).size
  const chunk_size = 5*10**5 //500 kb
  const start = Number(range.replace(/\D/g, ""))
  const end = Math.min(start + chunk_size, size-1)
  console.log(size)
  const content_length = end - start + 1

  const headers = {
    "Content-Range":`bytes ${start}-${end}/${size}`,
    "Accept-Ranges":'bytes',
    "Content-Length":content_length,
    "Content-Type":'video/mp4'

  }
  res.writeHead(206, headers)
  const video_stream = fs.createReadStream(path, {start, end})
  video_stream.pipe(res)
})

app.use((err, req, res, next) => {
  console.log(err)
  // next()
})
app.listen(process.env.PORT, () => {
  console.log('Server is running...')
})

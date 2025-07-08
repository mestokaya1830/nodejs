import express from 'express'
const app = express()
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

morgan(':method :url :status :res[content-length] - :response-time ms')
var accessLogStream = fs.createWriteStream(path.join('access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res, next) => {
  res.send({result: "look at the acces file"})
})


app.listen(3000, () => {
  console.log('Server is running...')
})
import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))//for css javascript so on

//use logger for all request
app.use((req, res, next) => {
  const log = {
    date:Date.now(),
    method: req.method,
    hostname: req.hostname,
    url: req.url
  }
  console.log(log)
  next()
})
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./views/index.html'))
})
app.get('/about', function (req, res) {
  res.sendFile(path.resolve(path.dirname('views/about.html')))
  // res.sendFile(path.resolve('./views/about.html'))
})
app.get('/contact', function (req, res) {
  res.sendFile(path.resolve('./views/contact.html'))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...')
})

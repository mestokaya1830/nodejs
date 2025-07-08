import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))//for css javascript so on


app.get('/', (req, res, next) => {
  res.sendFile(path.resolve('views/index.html'))
  next()
})
app.get('/about', (req, res, next) => {
  res.sendFile(path.resolve('views/pages/about.html'))
  next()
})
app.get('/contact', (req, res, next) => {
  res.sendFile(path.resolve('views/pages/contact.html'))
  next()
})

//if use middleware here after routes you must call next function in each router
app.use((req, res, next) => {
  const log = {
    date:Date.now(),
    method: req.method,
    hostname: req.hostname,
    url: req.url
  }
  console.log(log)
  // next()this must be removed
})

app.listen(3000, () => {
  console.log('Server is running...')
})

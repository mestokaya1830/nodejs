import express from 'express'
const app = express()
import path from 'path'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.resolve('views/pages/about.html'))
})

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve('views/pages/contact.html'))
})

app.listen(3000, () => {
  console.log('Server is running...')
})
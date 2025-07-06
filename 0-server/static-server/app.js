import express from 'express'
const app = express()
import path from 'path'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))//index.html is serving in static folder


app.get('/about', (req, res) => {
  res.sendFile(path.resolve('views/about.html'))
})

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve('views/contact.html'))
})

app.listen(3000, () => {
  console.log('Server is running...')
})
import express  from 'express'
import pg from 'pug'
const app = express()
import cors from 'cors'
import helmet from'helmet'

app.set(cors())
app.set(helmet())
app.set(express.json())
app.set('view engine','pug')

app.get('/', (req, res) => {
  res.render('index', {title:'Home'})
})
app.get('/about', (req, res) => {
  res.render('about', {title:'About'})
})
app.get('/contact', (req, res) => {
  res.render('contact', {title:'Contact'})
})

app.listen(3000, () => {
  console.log('Server is running...')
})
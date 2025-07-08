import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app use a global middleware if you use direct here
app.use((req, res, next) => {
  const login = false
  if (login) {
    next()
    return false
  } 
  res.send('Please login!')
})
app.get('/', function (req, res) {
  res.sendFile(path.resolve('views/index.html'))
})
app.get('/account', function (req, res) {
  res.sendFile(path.resolve('views/pages/account.html'))
})

app.listen(5000, () => {
  console.log('Server is running...')
})
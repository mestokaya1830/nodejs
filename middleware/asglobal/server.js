const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//app use a global middleware if you use direct here
app.use((req, res, next) => {
  const login = false
  if (login) {
    next()
  } else {
    res.send('Please login!')
  }
})
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})
app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '/home.html'))
})
app.get('/account', function (req, res) {
  res.sendFile(path.join(__dirname, '/account.html'))
})

app.listen(process.env.PORT || 3000)
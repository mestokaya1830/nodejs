const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get('/', (req, res, next) => {
  res.send('Call for create set router 🍪' )
})

app.get('/set', (req, res, next) => {
  // res.setHeader('set-cookie', 'user=mesto')//native
  res.cookie('user', 'mesto', {
    // maxAge: 10000, //or use expires
    maxAge: new Date('26 september 2021'),
    httpOnly: true, //not access in browser from javascript
    secure: false //not force to https
  })
  res.send('🍪 created!' )
})

app.get('/get', (req, res, next) => {
  res.cookie('user', 'mesto')
  res.send(req.cookies)
})

app.get('/del', (req, res, next) => {
  res.clearCookie('user')
  res.send('Cookie has been deleted!')
})



app.listen(3000, (req, res) => {
  console.log('Server is running...')
})
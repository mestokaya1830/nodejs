const express = require('express')
const app = express()
const limiter = require('express-rate-limit')

//global limit
// app.use(
//   limiter({
//     windowMs: 5000,//miliseconds
//     max: 5, // limit
//     message:'Stop'
//   })
// )

//router limit
const homeLimit = limiter({
  windowMs: 5000,//miliseconds
  max: 6, // limit
  message:'Stop'
})
const userLimit = limiter({
  windowMs: 5000,//miliseconds
  max: 4, // limit
  message:'Stop'
})
const adminLimit = limiter({
  windowMs: 5000,//miliseconds
  max: 2, // limit
  message:'Stop'
})
app.get('/', homeLimit, (req, res) => {
  res.send('Home')
})
app.get('/users', userLimit, (req, res) => {
  res.send('Users')
})
app.get('/admin', adminLimit, (req, res) => {
  res.send('Admin')
})


app.listen(3000, () => {
  console.log('Server is running...')
})

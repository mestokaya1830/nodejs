import express from 'express'
const app = express()
import limiter from 'express-rate-limit'

//global limit
// app.use(
//   limiter({
//     windowMs: 5000,//miliseconds
//     max: 5, // limit
//     message:'Stop',
//     standardHeaders: true,
//     legacyHeaders: false
//   })
// )

//router limit
const homeLimit = limiter({
  windowMs: 60*1000,//1 minute
  max: 6, // limit
  message:'Stop'
})
const userLimit = limiter({
  windowMs: 60*1000,//1 minute
  max: 4, // limit
  message:'Stop'
})
const adminLimit = limiter({
  windowMs: 60*1000,//1 minute
  max: 2, // limit
  message:'Stop'
})

app.set('trust proxy', '1')

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

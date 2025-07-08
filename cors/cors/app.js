const express = require('express')
const app = express()

//cors middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log(req.hostname)
  console.log(req.headers)
  console.log(Object.entries(res.header))
  res.json({message: 'Cors without package'})
})

app.listen(3000, () => {
  console.log('Server is running...')
})
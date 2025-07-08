const express = require('express')
const app = express()
const compression = require('compression')

app.use(compression({
  level:6,
  threshold: 10*1000,
  filter: (req, res) => {
    if(req.headers['x-no-compression']){
      return false
    }
    return compression.filter(req, res)
  }
}))

app.get('/', (req, res, next) => {
  const msg = 'Hello this is compression in Nodejs'
  res.send(msg.repeat(10000))
})


app.listen(3000, () => {
  console.log('Server is running...')
})
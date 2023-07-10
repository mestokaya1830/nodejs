const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const expressip = require('express-ip')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extented:true}))
app.use(expressip().getIpInfoMiddleware)

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ||
    (req.socket ? req.socket.remoteAddress : null)
  res.json(req.ipInfo)
})
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running...')
})
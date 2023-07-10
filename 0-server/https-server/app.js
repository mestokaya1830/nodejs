const express = require('express')
const app = express()
const https = require('https')
const path = require('path')
const fs = require('fs')


app.get('/', (req, res, next) => {
  res.json({data:'Secure'})
})


const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert/cert.pem'))
}, app)

server.listen(3000, () => {
  console.log('Ssl server is running...')
})

//npm i -g pkg
//pkg app.js for all executable
//pkg app.js --target node18-linux-x64
//pkg app.js --target node18-macos-x64
//pkg app.js --target node18-win-x64

const express = require('express')
const cors = require('cors')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.listen(3000, () => {
  console.log('App is running...')
})
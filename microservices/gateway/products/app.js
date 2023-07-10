const express = require('express')
const app = express()

app.get('/products', (req, res) => {
  res.status(200).send('I am Products.')
})

app.listen(3001, () => {
  console.log('Products Server is running...')
})
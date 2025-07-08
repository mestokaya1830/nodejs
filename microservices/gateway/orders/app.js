const express = require('express')
const app = express()

app.get('/orders', (req, res) => {
  res.status(200).send('I am Orders.')
})

app.listen(3002, () => {
  console.log('Orders Server is running...')
})
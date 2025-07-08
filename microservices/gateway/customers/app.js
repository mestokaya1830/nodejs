const express = require('express')
const app = express()

app.get('/customers', (req, res) => {
  res.status(200).send('I am customers API.')
})

app.listen(3003, () => {
  console.log('Customers Server is running...')
})
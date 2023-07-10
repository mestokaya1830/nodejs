const express = require('express')
const app = express()

app.get('/products', (req, res) => {
  res.status(200).send('I am products Route.')
})

app.get('/orders', (req, res) => {
  res.status(200).send('I am orders Route.')
})

app.get('/customers', (req, res) => {
  res.status(200).send('I am customers Route.')
})

app.post('/login', (req, res) => {
  res.status(200).send('I am login Route.')
})

app.post('/register', (req, res) => {
  res.status(200).send('I am register Route.')
})

app.listen(3001, () => {
  console.log('API Server is running...')
})
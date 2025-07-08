import express from 'express'
import emailPublisher from './publisher.js'
import emailConsumer from './consumer.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Home Page')
})


app.post('/register', async (req, res) => {
  await emailPublisher(req.body.email)
  await emailConsumer()
  res.status(200).json('Registered Chek Your Email')
})

app.use((error, req, res, next) => {
  res.status(500).json({error})
  next()
})

app.use((req, res) => {
  res.status(404).send('Page not found!')
})

app.listen(3000, () => console.log('Server is running...'))
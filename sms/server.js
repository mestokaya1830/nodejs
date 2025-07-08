const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const Vonage = require('@vonage/server-sdk')

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))

app.set('view engine', 'pug')
app.set('views', 'views')

app.get('/', (req, res, next) => {
  res.render('index')
})

app.post('/sendmessage', (req, res, next) => {
  console.log(req.body)
  const vonage = new Vonage({
    apiKey: "6ed879e1",
    apiSecret: "HpU3F9eIxoXAInWB"
  })
  const from = "Vonage APIs"
  const to = req.body.phone
  const text = req.body.text

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
      }
    }
  })
  res.redirect('/')
})

app.use((req, res) => {
  res.status(404).json('Not Found')
})

app.use((error, req, res, next) => {
  res.status(400).json(error)
})

app.listen(3000, () => {
  console.log('Server is running...')
})
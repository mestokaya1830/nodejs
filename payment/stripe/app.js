const express = require('express')
const pg = require('pug')
const app = express()
const cors = require('cors')
// const helmet = require('helmet')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))
// app.use(helmet())

app.set('view engine','pug')

const secret_key = 'sk_test_51KsAmgGjc2DBcMZIJwlMFs6s8gQQOxvN9mXqEYbZFkFHZg339AJY9SOhkH7rmmQL9ePqak1tANpSDIDMi7lkqNYp00rO853BbL'
const stripe = require('stripe')(secret_key)

app.get('/', (req, res) => {
  res.render('index', {
    title:'Home',
    key:'pk_test_51KsAmgGjc2DBcMZI8vlI0imznOZUw5lR5AMdAhKCUMl8QquJPVnb6EWC5TELup7x3terZUEj4A9Wim6Vps25m1Ki00uPSjRrhE'
  })
})
app.post('/payment', (req, res) => {
  stripe.customers.create({
    email:req.body.stripeEmail,
    source:req.body.stripeToken,
    name:'Mesto Kaya',
    address: {
      line1:'address',
      postalCode:8000,
      city:'Zurich',
      state:'Zurich',
      country:'Switzerland'
    }
  }).then(customer => {
    return stripe.charges.create({
      amount:3000,
      description:'Nodejs course',
      currency:'usd',
      customer: customer.id
    })
  }).then(charge => {
    res.send('Success')
  }).catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('Server is running...')
})
import express from 'express'
import expressLayouts from 'express-ejs-layouts'
const app = express()
import cors from 'cors'
import stripe from 'stripe'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))
app.use(expressLayouts)
app.set('view engine', 'ejs')


let strp = stripe('')

app.get('/', (req, res) => {
  res.render('index', {
    title:'Home',
    key:''
  })
})

app.post('/payment', (req, res) => {
  const {stripeEmail, stripeToken, name, postal_code, city, state, country, address} = req.body
  strp.customers.create({
    email:stripeEmail,
    source:stripeToken,
    name:name,
    address: {
      line1:address,
      postal_code:postal_code,
      city:city,
      state:state,
      country:country
    }
  }).then(customer => {
    return strp.charges.create({
      amount:3000,
      description:'Nodejs course',
      currency:'usd',
      customer: customer.id
    })
  }).then(charge => {
    res.send('Success')
  }).catch(error => console.log(error))
})


//get all customers from this account
app.get('/customers', async (req, res) => {
  const customers = await strp.customers.list({}, {stripeAccount: 'acct_1KsAmgGjc2DBcMZI'})
  res.send(customers)
})


app.listen(3000, () => {
  console.log('Server is running...')
})
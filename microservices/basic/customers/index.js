import express from 'express'
const app = express()
import db from './db.js'
import Customers from './customersSchema.js'
import helmet from 'helmet'

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))

//if you need call other service(orders or products) from here with axios or request
app.get('/', async(req, res, next) => {
  const result = await Customers.find({})
  res.json({result})
})

app.get('/customers/:id', async(req, res, next) => {
  const customer = await Customers.findOne({id:req.params.id})
  if(customer){
    res.status(200).json({customer:customer})
  }
})

//listen server
app.listen(3002, () => {
  console.log('Server listen...' + 3002)
})
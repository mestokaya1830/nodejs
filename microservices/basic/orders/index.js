import express from 'express'
const app = express()
import db from './db.js'
import Orders from './ordersSchema.js'
import axios from 'axios'
import helmet from 'helmet'

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))

//if you need call other service(customers or products) from here with axios or request
app.get('/', async(req, res, next) => {
  const result = await Orders.find({})
  res.json({result})
})

app.get('/order/:id', async(req, res, next) => {
  const order = await Orders.findOne({id:req.params.id})
  if(order){
    //get order customer
    await axios.get('http://localhost:3002/customers/' + order.customerId).then (result => {
      res.send(result.data)
    })
  }
})

//listen server
app.listen(3003, () => {
  console.log('Server listen...' + 3003)
})
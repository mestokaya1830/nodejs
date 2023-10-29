import express from 'express'
const app = express()
import cors from 'cors'
import db from '../schema/transaction/db.js'
import Customers from '../schema/transaction/customersSC.js'
import Products from '../schema/transaction/productsSC.js'
import Orders from '../schema/transaction/ordersSC.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
  const result = await Customers.find()
  res.json(result)
})

app.listen(3000, () => {
  console.log('Server is running...')
})
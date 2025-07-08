import express from 'express'
const app = express()
import db from './db.js'
import Products from './productsSchema.js'
import path from 'path'
import helmet from 'helmet'

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))

//if you need call other service(orders or customers) from here with axios or request
app.get('/', async(req, res, next) => {
  const result = await Products.find({})
  res.json({result})
})


//listen server
app.listen(3001, () => {
  console.log('Server listen...' + 3001)
})
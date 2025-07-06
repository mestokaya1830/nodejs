import express from 'express'
const Router = express.Router()
import tryCatch  from '../middleware/tryCatch.js'
import Orders from '../models/schemas/ordersSC.js'

Router.get('/', tryCatch(async(req, res) => {
  const result = await Orders.find({})
  res.status(200).json({Orders:result})
}))

Router.post('/', tryCatch(async(req, res) => {
  const newOrder = new Orders({
    productId: req.body.productId,
    quantity: req.body.quantity
  })
  await newOrder.save()
  res.status(200).json({message:'New Order Added'})
}))

Router.get('/:id', tryCatch(async(req, res) => {
  const result = await Orders.findOne({_id: req.params.id})
  res.status(200).json({order: result})
}))

Router.patch('/:id', tryCatch(async(req, res) => {
  await Orders.updateMany({_id: req.params.id}, {$set:{quantity: req.body.quantity}})
  res.status(200).json({message: 'Order Updated'})
}))

Router.delete('/:id', tryCatch(async(req, res) => {
  await Orders.deleteOne({_id: req.params.id})
  res.status(200).json({message:'Order Deleted'})
}))


export default Router
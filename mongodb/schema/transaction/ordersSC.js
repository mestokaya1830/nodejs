import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
  customerID: mongoose.SchemaTypes.ObjectId(),//come from customers-table
  productID: mongoose.SchemaTypes.ObjectId(),//come from products-table
  products:{type: String, required: true},
  quantity:{type: Number, required: true},
  amount:{type: Number, required: true},
  created_at:{type: Date, required: true, default:Date.now()}
})

export default new mongoose.model('orders', ordersSchema)
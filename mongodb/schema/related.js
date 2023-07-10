import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
  customerID: mongoose.SchemaTypes.ObjectId(),//come from customer-table
  status:[{type: String, required: true, minlength:3, length:10}],
  created_at:{type: Date, required: true, default:Date.now()}
})

export default new mongoose.model('users', ordersSchema)


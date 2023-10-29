import mongoose from 'mongoose'

const customersSchema = new mongoose.Schema({
  firstname:{type: String, required: true, unique:true, minlength:3, length:50},
  lastname:{type: String, required: true, unique:true, minlength:3, length:50},
  created_at:{type: Date, required: true, default:Date.now()}
})

export default new mongoose.model('customers', customersSchema)
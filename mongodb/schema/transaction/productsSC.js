import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
  name:{type: String, required: true, unique:true, minlength:3, length:50},
  price:{type: Number, required: true},
  quantity:{type: Number, required: true},
  created_at:{type: Date, required: true, default:Date.now()},
})

export default new mongoose.model('products', productsSchema)
import mongoose from 'mongoose'

const ordersSC = new mongoose.Schema({
  productId:{type: mongoose.Schema.Types.ObjectId, required: true},
  quantity:{type: Number, default: 1}
})

export default mongoose.model('orders', ordersSC)
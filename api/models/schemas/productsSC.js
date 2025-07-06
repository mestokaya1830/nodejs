import mongoose from 'mongoose'

const productsSC = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Product-Name can\'t be null!'],
    minlength: [3, 'Product-Name must be greater then 2']
  },
  price:{type: Number, required: [true, 'Price can\t be null!!']}
})

export default mongoose.model('products', productsSC)
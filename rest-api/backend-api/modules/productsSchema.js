const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name required!'], unique:true},
  price: {type: Number, required: [true,'Price required!'],minlength:[1,'Price must be less 1 charecters!']},
  created_at: {type: Date, default: Date.now()}
})

module.exports = new mongoose.model('Products', ProductsSchema)
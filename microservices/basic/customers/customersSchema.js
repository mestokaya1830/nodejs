import mongoose from 'mongoose';

const CustomersSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Name required!'],
    unique:true
  },
  city: {
    type: String, 
    required: [true,'City required!'],
    minlength:[4,'City must be less 2 charecters!']
  },
  created_at:{
    type: Date, 
    required:true,
    default: Date.now()
  }
})

export default new mongoose.model('Customers', CustomersSchema)
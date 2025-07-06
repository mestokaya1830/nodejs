import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema({
  customerID: {
    type:String,
    required: true
  } ,
  productID: {
    type:String,
    required: true
  },
  amount: {
    type: Number, 
    required: [true,'Amount required!'],
    minlength:[4,'Amount must be less 2 charecters!']
  },
  created_at:{
    type: Date, 
    required:true, 
    default: Date.now()
  }
})

export default new mongoose.model('Orders', OrdersSchema)

import Mongoose from 'mongoose'

const usersSC = new Mongoose.Schema({
  googleid: {type: String, required: true},
  name:{type: String, required: true, minlength:3, length:100},
  created_at:{type: Date, required: true, default:Date.now()}
})

export default Mongoose.model('users', usersSC)
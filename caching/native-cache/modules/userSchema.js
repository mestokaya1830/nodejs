import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  name:{type: String, required: true, minlength:3, length:50},
  password:{type: String, required: true, minlength:4, length:100},
  created_at:{type: Date, required: true, default:Date.now()},
  isAdmin:{type: Boolean, default: false}
})

export default new mongoose.model('users', usersSchema)
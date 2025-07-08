import mongoose from "mongoose";
import Cryptr from 'cryptr'
const crypto = new Cryptr('secret')

const userSC = new mongoose.Schema({
  name:{type: String},
  password:{type: String},
  age:{type: Number}
})


userSC.pre('save', function() {
  this.password = crypto.encrypt(this.password)
})

export default mongoose.model('users', userSC)
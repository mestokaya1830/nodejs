import mongoose from 'mongoose'

const usersSC = new mongoose.Schema({
  customerid:{type: String, required: true, unique: true},
  firstname:{type: String, required: true},
  lastname:{type: String, required: true},
  company:{type: String, required: true},
  date:{type: Date, default: Date.now},

})

export default mongoose.model('users', usersSC)
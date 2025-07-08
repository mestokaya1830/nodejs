import Mongoose from 'mongoose'

const tempSchema = new Mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Name required!']
  },
  email: {
    type: String, 
    required: [true, 'Email required!']
  },
  password: {
    type: String, 
    required: [true, 'Password required!']
  },
  codeid: {
    type: String, 
    required: [true,'Codeid required!']
  },
  created_at: {
    type: Date,
    default: Date.now(),
    index: {expires: '1000'}
  }
})

export default  Mongoose.model('temps', tempSchema)
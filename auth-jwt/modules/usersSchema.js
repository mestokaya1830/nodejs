import Mongoose from 'mongoose'

const UsersSchema = new Mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Name required!'],
    unique:true
  },
  password: {
    type: String, 
    required: [true,'Password required!'],
    minlength:[4,'Password must be less 4 charecters!']
  },
  created_at: {
    type: Date, 
    default: Date.now()
  }
})

export default  Mongoose.model('Users', UsersSchema)
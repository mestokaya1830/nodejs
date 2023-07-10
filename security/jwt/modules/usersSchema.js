const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name required!'], unique:true},
  password: {type: String, required: [true,'Password required!'],minlength:[4,'Password must be less 4 charecters!']},
  created_at: {type: Date, default: Date.now()}
})

module.exports = new mongoose.model('Users', UsersSchema)
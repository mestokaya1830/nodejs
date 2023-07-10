const mongoose = require('mongoose')

const blockChainSchema = new mongoose.Schema({
  timestamp:{required: true, type: Date, default: Date.now()},
  transactions:{required: true, type: Array},
  prevHash:{required: false, type: String},
  hash:{required: true, type: String},
})

module.exports =  mongoose.model('blockchains', blockChainSchema)
const Blockchain = require('./chain')
const DB = require('./modules/db')

const blockchain = new Blockchain()

blockchain.addNewTransaction('Mesto','Filiz', 500)
blockchain.addNewBlock(null)
console.log(blockchain)
const Hash = require('object-hash')
const Validater = require('./validater')
const db = require('./modules/db')
const BlockChainModel = require('./modules/blockChainSchema.js')

let target_hash = Hash(1560)

class Blockchain {
  constructor(){
    this.chain = []
    this.curr_transactions = []
  }

  async addNewBlock(){
    let block = {
      timestamp: Date.now(),
      transactions:this.curr_transactions,
      prevHash: ''
    }

    let lastBlock = await BlockChainModel.findOne().sort({_id:-1})
    if(Validater.proofOfWork() == target_hash){
      block.hash = Hash(block)
      if(lastBlock){
        block.prevHash = lastBlock.hash
      }
      let newBlock = new BlockChainModel(block)
      newBlock.save()

      this.chain.push(block)
      this.curr_transactions = []
      return block
    }
  }

  addNewTransaction(sender, recipient, amount){
    return this.curr_transactions.push({sender, recipient, amount})
  }

}

module.exports = Blockchain
const SHA256 = require('crypto-js/sha256')

class CryptoBlock {
  constructor(index, timestamp, data, prevHash = ''){
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.prevHash = prevHash,
    this.hash = this.computedHash()
    this.once = 0
  }

  computedHash(){
    return SHA256(this.index + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.once).toString()
  }

  proofOfWork(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
      this.once++
      this.hash = this.computedHash()
    }
  }
}

class CryptoBlockChain {
  constructor(){
    this.blockchain = [this.startGenesisBlock()]
    this.difficulty = 4
  }
  startGenesisBlock(){
    return new CryptoBlock(0, '01/01/2023','Initial block of chain', '0')
  }

  getLastBlock() {
    return this.blockchain[this.blockchain.length -1]
  }

  addNewBlock(newBlock){
    newBlock.prevHash = this.getLastBlock().hash
    newBlock.proofOfWork(this.difficulty)
    this.blockchain.push(newBlock)
  }

  checkChainValidity(){
    for(let i = 1; i < this.blockchain.length -1; i++){
      const currentBlock = this.blockchain[i]
      const prevBlock = this.blockchain[i - 1]
      if(currentBlock.hash !== currentBlock.computedHash()){
        return false
      }
      if(currentBlock.prevHash !== prevBlock.hash){
        return false
      }
    }
    return true
  }
}

const bl = new CryptoBlockChain()
console.log('Mining....')
bl.addNewBlock(new CryptoBlock(1, '01/03/2023', {sender:'Mesto',recepient:'Filiz', amount: 50}))
bl.addNewBlock(new CryptoBlock(2, '01/03/2023', {sender:'Deniz',recepient:'Helin', amount: 100}))

console.log(JSON.stringify(bl, null, 2))
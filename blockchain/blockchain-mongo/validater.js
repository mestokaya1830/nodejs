const Hash = require('object-hash')

const target_hash = 1560

const validProof = (proof) => {
  let guessHash = Hash(proof)
  console.log("Hashing: ", guessHash)
  return guessHash == Hash(target_hash)
}

const proofOfWork = () => {
  let proof = 0
  while(true){
    if(!validProof(proof)){
      proof++
    } else {
      break
    }
  }
  return Hash(proof)
}

module.exports = {
  validProof,
  proofOfWork
}
const express = require('express')
const app = express()
const cryptr = require('cryptr')
const CRYPTR = new cryptr('secret')

app.get('/', (req, res) => {
  const pass = '9090'
  const encryptPass = CRYPTR.encrypt(pass)//encrypt and saved in db  
  const decryptPass = CRYPTR.decrypt(encryptPass)//get from db and decrypt

  if(pass === decryptPass){ 
    res.status(200).json('Passed')
  } else {
    res.status(400).json('Wrong Password!')
  }
})


app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running...')
})
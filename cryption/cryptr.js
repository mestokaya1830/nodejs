import express from 'express'
const app = express()
import cryptr from 'cryptr'
const CRYPTR = new cryptr('secret')

app.use(express.json())

const users = []

app.post('/senduser', (req, res) => {
  const encryptPass = CRYPTR.encrypt(req.body.pass)  
  users.push({name: req.body.name, pass: encryptPass})
  res.json(users)
})

app.get('/getuser', (req, res) => {
  const decryptPass = CRYPTR.decrypt(users[0].pass)//get from db and decrypt
  console.log(decryptPass)
  if(decryptPass == '9090'){ 
    res.status(200).json(users)
  } else {
    res.status(400).json('Wrong Password!')
  }
})

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running...')
})
import express from 'express'
const app = express()
import bcrypt from 'bcrypt'

app.use(express.json())

let users = []

app.post('/senduser', async(req, res) => {
  const passHashed = await bcrypt.hash(req.body.pass, 10)
  users.push({name: req.body.name, pass: passHashed})
  res.json(users)
})

app.get('/getuser', async(req, res) => {
  if(await bcrypt.compare('9090', users[0].pass)){
    res.json(users)
  } else {
    res.json({message:'Wrong pass!'})
  }
})

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running...')
})

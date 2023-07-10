const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')

app.get('/', async (req, res) => {
  const pass = '9990'//user password
  const passHashed = bcrypt.hash(pass, 10)//hash user password and saved in db
  const match = await bcrypt.compare(pass, passHashed)//get passHased from db
  !match && res.status(400).json('Wrong password!')
  res.status(200).send('Passed')
})

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running...')
})

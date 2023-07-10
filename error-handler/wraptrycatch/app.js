const express = require('express')
const app = express()
const cors = require('cors')
const Wrap = require('./wrap.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', Wrap(async(req, res, next) => {
  const user = undefined
  if (!user) {
    throw new Error('User not found!')
  }
  return res.send(user)
}))

app.use((error, req, res, next) => {
  return res.status(400).send(error.message)//grap this from frontend
})

app.listen(3000, () => {
  console.log('Server is runing...')
})

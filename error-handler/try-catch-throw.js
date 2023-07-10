const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', async(req, res, next) => {
  try {
    const user = undefined
    if(!user) {
      throw new Error('User not found!')
    }
  } catch (error) {
    return res.status(400).send(error.message)
  }
  return res.send('Home Page')
})


app.listen(3000, ()=> {
  console.log('Server is runing...')
})
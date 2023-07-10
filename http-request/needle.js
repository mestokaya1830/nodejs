const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const needle = require('needle')

dotenv.config()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

app.get('/', async(get, res) => {
  try {
    const result = await needle('GET','https://jsonplaceholder.typicode.com/users')
    const final = await result.body

    res.send(final)
  } catch (error) {
    console.error(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})
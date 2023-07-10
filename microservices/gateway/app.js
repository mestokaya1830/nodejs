const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const Router = require('./routes/index')

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/', Router)

app.listen(3000, () => {
  console.log('Gateway is running...')
})
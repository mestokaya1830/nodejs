const express = require('express')
const app = express()
const cors = require('cors') 
const productsRouter = require('./router/productRouter')
const db = require('./modules/db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', productsRouter)

app.listen(3000, () => {
  console.log('Server is running...')
})

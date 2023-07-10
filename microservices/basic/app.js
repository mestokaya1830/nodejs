import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import httpProxy from 'express-http-proxy'
const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(express.static('static'))
app.use(express.urlencoded({extended: true}))

app.use('/products', httpProxy('http://localhost:3001', {timeout: 3000}))
app.use('/customers', httpProxy('http://localhost:3002', {timeout: 3000}))
app.use('/orders', httpProxy('http://localhost:3003', {timeout: 3000}))

app.listen(3000, () => {
  console.log('Gateway is running...')
})
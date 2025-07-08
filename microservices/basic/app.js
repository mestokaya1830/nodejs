import express from 'express'
const app = express()
import helmet from 'helmet'
import httpProxy from 'express-http-proxy'

app.use(helmet())
app.use(express.json())
app.use(express.static('static'))
app.use(express.urlencoded({extended: true}))

app.use('/products', httpProxy('http://localhost:3001', {timeout: 3000}))
app.use('/customers', httpProxy('http://localhost:3002', {timeout: 3000}))
app.use('/orders', httpProxy('http://localhost:3003', {timeout: 3000}))

app.listen(3000, () => {
  console.log('Gateway is running...')
})
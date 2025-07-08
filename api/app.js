import express from 'express'
const app = express()
import helmet from 'helmet'
import 'dotenv/config'
import db from './models/db.js'
import productsRouter from './routes/productsRouter.js'
import ordersRouter from './routes/ordersRouter.js'

app.use(helmet())
app.use(express.json())
app.use(express.static('static'))

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="display:flex;justify-content:center;margin-top:50px;">Home Page</h1>')
})

app.use('/products',  productsRouter)
app.use('/orders',  ordersRouter)


app.use((error, req, res, next) => {
  res.json(error)
  next(error)
})

app.use((req, res) => {
  res.status(404).send('Page Not Found')
})

app.listen(process.env.PORT, () => {
  console.log('Server is running...')
})
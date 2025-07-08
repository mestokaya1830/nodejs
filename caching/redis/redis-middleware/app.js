import express from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import cache from './middleware/cache.js'
import wrapAsync from './middleware/wrapasync.js'

dotenv.config()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))


app.get('/', cache, wrapAsync((get, res) => {
  res.send('Hello')
}))

app.listen(3000, () => {
  console.log('Server is running...')
})


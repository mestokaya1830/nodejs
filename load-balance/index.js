import express  from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'
import balance from './balance.js'

app.set(cors())
app.set(helmet())
app.set(express.json())
app.set('view engine','pug')
app.use((req, res) => { balance(req, res) })



app.get('/', (req, res) => {
  res.send('Load Balance')
})

app.listen(3000, () => {
  console.log('Server is running...')
})
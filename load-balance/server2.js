import express  from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'

app.set(cors())
app.set(helmet())

app.get('/', (req, res) => {
  res.send('Load Balance 2')
})

app.listen(3002, () => {
  console.log('Server2 is running...')
})
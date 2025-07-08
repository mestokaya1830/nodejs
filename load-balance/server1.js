import express  from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'

app.set(cors())
app.set(helmet())

app.get('/', (req, res) => {
  res.send('Load Balance 1')
})

app.listen(3001, () => {
  console.log('Server1 is running...')
})
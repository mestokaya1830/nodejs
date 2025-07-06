import express  from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'

app.set(cors())
app.set(helmet())

app.get('/', (req, res) => {
  res.send('Load Balance 3')
})

app.listen(3003, () => {
  console.log('Server3 is running...')
})
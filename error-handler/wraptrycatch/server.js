import express from 'express'
const app = express()
import cors from 'cors'
import Wrap from './middleware/tryCatch.js'


app.use(cors())
app.use(express.json())

app.get('/api', Wrap((req, res, next) => {
  const user = {
    name:'Mesto',
    age: 50
  }
  res.json(user)
}))

app.use((error, req, res, next) => {
  return res.status(400).send(error.message)//grap this in frontend
})

app.listen(3000, () => {
  console.log('Server is running...')
})
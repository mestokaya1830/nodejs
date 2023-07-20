import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
const app = express()


app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Home')
})

app.get('/test', (req, res) => {
  if(req.query.lang == 'mesto'){
    res.send(req.query)
  } else {
    res.send('error')
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})
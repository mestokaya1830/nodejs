const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()


app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Home')
})

app.get('/test', (req, res) => {
  if(req.query.lang === 'mesto'){
    console.log(req.query)
  }
  res.send(req.query)
})

app.listen(3000, () => {
  console.log('Server is running...')
})
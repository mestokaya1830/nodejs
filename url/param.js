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

app.get('/:id', (req, res) => {
  res.send(req.params.id)
})


app.listen(3000, () => {
  console.log('Server is running...')
})
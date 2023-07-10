const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res, next) => {
  res.sen('Home Page')
})


app.use((error, req, res, next) => {
  console.log(error)
  res.status(400).json(error)//grap this from frontend
})

app.listen(3000, ()=> {
  console.log('Server is runing...')
})
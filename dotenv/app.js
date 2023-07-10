const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
app.use(cors())

app.get('/', (req, res) => {
  if (process.env.HOST === '127.0.0.') {
    res.json({
      PORT:process.env.PORT,
      HOST:process.env.HOST,
      APIKEY:process.env.APIKEY
    })
  } else {
    res.json({Error:'Host not correct!'})
  }
})

//listen server
app.listen(process.env.PORT || 4000, () => {
  console.log('Server listen...')
})
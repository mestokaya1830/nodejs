import express from 'express'
const app = express()
import cors from 'cors'
import dotenv from 'dotenv'

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
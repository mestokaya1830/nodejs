import express from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

app.get('/', async(get, res) => {
  try {
    const result = await fetch('https://jsonplaceholder.typicode.com/users')
    const final = await result.json()

    res.send(final)
  } catch (error) {
    console.error(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})
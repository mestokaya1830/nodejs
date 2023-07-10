import express from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import request from 'sync-request'

dotenv.config()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

app.get('/',(get, res) => {
  try {
    const result =  request('get','https://jsonplaceholder.typicode.com/users',{json: {results: 'results'}})
    const final = JSON.parse(result.getBody('utf8'))

    res.send(final)
  } catch (error) {
    console.error(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})
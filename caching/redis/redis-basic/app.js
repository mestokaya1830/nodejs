import express from 'express'
const app = express()
import helmet from 'helmet'
import redis from 'redis'

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

const client = redis.createClient(6379)
client.connect()
client.on('connect', () => {
  console.log('Connected to redis...')
})

app.post('/setredis', async(req, res) => {
  //create redis client
  try {
    client.setEx('users', 3600, req.body.name)
    res.json({message: 'Form is stored in redis'})
  } catch (error) {
    console.error(error)
  }
})

app.get('/getredis', async(req, res) => {
  try {
    const users = await client.get('users')
    res.json({message: users})
  } catch (error) {
    console.error(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})


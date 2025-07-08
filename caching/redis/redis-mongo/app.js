import express from 'express'
import path from 'path'
import db from './db.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import Users from './usersSC.js'
import redis from 'redis'
const app = express()

const client = redis.createClient(6379)
client.connect()
client.on('connect', () => {
  console.log('Connected to redis...')
})

app.use(express.json())
app.use(express.static('static'))


app.use(session({
  secret:'mesto',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 36000,
    httpOnly: true,
    secure: false
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://mesto:MK1972mk11130113@localhost:27017/works?authSource=works',
    autoRemove: 'native'
  })
}))

if(process.env.NODE_ENV == 'productiion'){
  app.use(express.static('dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'))
  })
}

app.get('/', async(req, res) => {
  let redisCache = await client.get('users')
  if(redisCache != null){
    res.status(200).json(JSON.parse(redisCache))
  } else {
    const result = await Users.find()
    client.setEx('users', 10, JSON.stringify(result))
    res.status(200).json(result)
  }
})


app.delete('/', async(req, res) => {
  await Users.deleteMany({})
  res.status(200).json('Deleted')
})

app.post('/', async(req, res) => {
  const newUser = new Users({
    name: req.body.name,
    password: req.body.password,
    age: req.body.age
  })
  await newUser.save()
  res.status(200).json('Saved')
})


app.use((err, req, res, next) => {
  res.json({errors: err})
  next(err)
})

app.use((req, res) => {
  res.status(404).send('Page not found!')
})

app.listen(3000, () => console.log('Server is running...'))




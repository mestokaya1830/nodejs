const express = require('express')
const app = express()
const db = require('./modules/db')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
dotenv.config()

const authRouter = require('./routers/authRouter.js')
const usersRouter = require('./routers/usersRouter.js')

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'static')))

app.use('/', authRouter)
app.use('/api', usersRouter)

app.use((error, req, res, next) => {
  console.error({error})
  res.json({error})
})

//listen server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listen...')
})
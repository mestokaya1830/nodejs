const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./api/router')
const auth = require('./api/auth')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/', auth, router)
app.listen(process.env.PORT || 3000)
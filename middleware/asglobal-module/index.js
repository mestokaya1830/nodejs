import express from 'express'
const app = express()
import cors from 'cors'
import router from './api/router.js'
import auth from './api/auth.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//global model middleware
app.use(auth)
app.use('/', router)
app.listen(process.env.PORT || 3000)
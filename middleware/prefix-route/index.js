import express from 'express'
const app = express()
import cors from 'cors'
import router from './api/router.js'
import auth from './api/auth.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/', auth, router)

app.listen(3000, () => {
  console.log('Server is running...')
})
import express  from 'express'
import cors  from 'cors'
const app = express()
import Router from './modules/router.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//or include as global
app.use('/',  Router)

app.use((error, req, res, next) => {
  console.log(error)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...')
})
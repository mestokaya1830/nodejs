import express  from 'express'
const app = express()
import mongoose from 'mongoose'
mport db from './modules/db.js'
import cors from 'cors'
import helmet from 'helmet'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(helmet())

const personsSchema = new mongoose.Schema({} , {strict: false})
const Persons = new mongoose.model('Persons', personsSchema)

app.post('/', async(req, res) => {
  let page = req.body.page === undefined ? 1 : req.body.page
  let limit = 5
  const result = await Persons.find({},{_id:0}).limit(limit).skip((page-1) * limit)
  const length = await Persons.aggregate([{$count:'count'}])
  res.json({result,length})
})

app.use((err, req, res, next) => {
  console.log(err)
  next(err)
})

app.listen(3000, () => {
  console.log('Server is running...')
})

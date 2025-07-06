const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const fs = require('fs')
let person = require('./person.json')
const app = express()

dotenv.config()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.status(200).json(person)
})

app.get('/:id', (req, res) => {
  const result = person.find(item => item.id = req.params.id)
  res.status(200).json(result)
})

app.post('/', (req, res) => {
  let newPerson = {
    id:7,
    name: 'Deniz',
    age: 23
  }
  person.push(newPerson)
  fs.writeFileSync('./person.json', JSON.stringify(person), 'utf8', (err => {
    err ? console.log(err) : console.log('Saved')
  }))
  res.status(200).json('Saved')
})

app.put('/:id', (req, res) => {
  let id = req.params.id
  const findIdndex = person.findIndex(item => item.id == id)
  person[findIdndex] = {
    id,
    name:'Eko',
    age:19
  }
  fs.writeFileSync('./person.json', JSON.stringify(person), 'utf8', (err => {
    err ? console.log(err) : console.log('Updated')
  }))
  res.status(200).json('Updated')
})

app.delete('/:id', (req, res) => {
  const result = person.filter(item => item.id != req.params.id)
  fs.writeFileSync('./person.json', JSON.stringify(result), 'utf8', (err => {
    err ? console.log(err) : console.log('Removed')
  }))
  res.status(200).json('Deleted')
})

app.use((error, req, res, next) => {
  console.log(error)
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running...')
})
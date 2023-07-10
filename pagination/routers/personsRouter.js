const router = require('express').Router()
const mongoose = require('mongoose')
const wrapAsync = require('../middleware/wrapAsync.js')

const personsSchema = new mongoose.Schema({} , {strict: false})
const Persons = new mongoose.model('Persons', personsSchema)

router.get('/persons', wrapAsync(async(req, res) => {
  const {page = 1, limit = 5} = req.query
  const result = await Persons.find({},{_id:0}).limit(limit).skip((page-1) * limit).lean()
  res.render('persons', {
    title: 'Persons',
    persons:result
  })
}))

module.exports = router
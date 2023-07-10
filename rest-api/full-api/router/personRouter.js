const router = require('express').Router()
const Persons = require('../persons.json')
const dotenv = require('dotenv')
const error = require('../try-catch')
dotenv.config()


router.get('/', (req, res, next) => {
  res.status(200).json({message:'Home Page'})
})

router.get(`/person/${process.env.API_KEY}`, error((req, res, next) => {
 res.status(200).json(Persons)
}))

router.get(`/person/${process.env.API_KEY}/length`, error((req, res, next) => {
  res.status(200).json(Persons.length)
}))

router.get(`/person/${process.env.API_KEY}/:id`, error((req, res, next) => {
  const result = Persons.find(item => item.index == req.params.id)
  res.status(200).json(result)
}))


module.exports = router
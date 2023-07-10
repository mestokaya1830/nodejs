const Router = require('express').Router()


Router.get('/', (req, res) => {
  res.render('index', {title:'Home Page'})
})


module.exports = Router
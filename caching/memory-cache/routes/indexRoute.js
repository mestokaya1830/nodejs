const Router = require('express').Router()
const cache = require('../middleware/cache')
const request = require('sync-request')
const wrapAsync = require('../middleware/wrapasync')

Router.get('/', (req, res) => {
  res.render('index',{title: 'Home',})
})

Router.get('/users', cache(10), wrapAsync(async(req, res) => {
  const result =  request('get','https://jsonplaceholder.typicode.com/users',{json: {results: 'results'}})
  const final = JSON.parse(result.getBody('utf8'))
  console.log(final)
  res.render('users', {
    title: 'Users',
    users: final
  })
}))

module.exports = Router
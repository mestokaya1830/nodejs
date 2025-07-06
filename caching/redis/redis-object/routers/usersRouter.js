const Router = require('express').Router()
const wrapAsync = require('../middleware/wrapasync.js')
const redis = require('redis')
const request = require('sync-request')

const client = redis.createClient(6379)
client.connect()
client.on('connect', () => {
  console.log('Connected to redis...')
})

Router.get('/users', wrapAsync(async(req, res) => {
  try{
    const users = await client.get('users')
    if(users) {
      const final = JSON.parse(users);
      res.render('users', {
        title: 'Users',
        users:final
      })
    } else {
      const result =  request('get','https://jsonplaceholder.typicode.com/users',{json: {results: 'results'}})
      const final = JSON.parse(result.getBody('utf8'))
      client.setEx('users', 10, JSON.stringify(final));
      res.render('users', {
        title: 'Users',
        users:final
      })
    }
  }catch(err) {
    req.flash('danger',err)
    res.render('users')
  }
}))

module.exports = Router

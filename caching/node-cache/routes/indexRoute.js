const Router = require('express').Router()
const request = require('sync-request')
const wrapAsync = require('../middleware/wrapasync.js')
const Cache = require('node-cache')
const myCache = new Cache({stdTTL:10})

Router.get('/', (req, res) => {
  res.render('index',{title: 'Home',})
})

Router.get('/users', wrapAsync(async(req, res) => {
  if(myCache.has('users')){
    res.render('users', {
      title:'Users',
      users:myCache.get('users')
    })
  }else{
    const result =  request('get','https://jsonplaceholder.typicode.com/users',{json: {results: 'results'}})
    const final = JSON.parse(result.getBody('utf8'))
    myCache.set('users', final)
    res.render('users', {
      title: 'Users',
      users: final
    })
  }
}))

module.exports = Router
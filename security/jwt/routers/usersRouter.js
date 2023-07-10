const Router = require('express').Router()
const Users =  require('../modules/usersSchema.js')
const wrapAsync = require('../middleware/wrapasync.js')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret')
const jwt = require('jsonwebtoken')
const checkToken = require('../middleware/jwt.js')

Router.get('/users', checkToken,(req, res) => {
  //get req.token from localstorage
  jwt.verify(req.token, 'secret', async function(err, data) {
    if(err){
      res.sendStatus(403)
    } else {
      const allUsers = await Users.find({})
      res.json({users: allUsers})
    }
    
  })
})

Router.get('/detailuser/:id', wrapAsync(async(req, res) => {
  const user = await Users.findById(req.params.id)
  result = {
    name: user.name,
    password:cryptr.decrypt(user.password)
  }
  res.json({user: result})
}))


Router.put('/edituser/:id', wrapAsync(async(req, res) => {
  if(req.body.password.length > 3){
    await Users.updateOne(
      {_id:req.params.id},
      { $set: { password: cryptr.encrypt(req.body.password) } }
    )
    res.json({message:'Updated!'})
  }else{
    res.json({message:'No User Found'})
  }
}))

Router.delete('/deleteuser/:id', wrapAsync(async(req, res) => {
  await Users.deleteOne({_id: req.params.id})
  res.json({message:'User Deleted'})
}))


Router.post('/users/search', wrapAsync(async(req, res) => {
  if(req.body.name === ''){
    const allUsers = await Users.find()
    res.json({users: allUsers})
  } else {
    const allUsers = await Users.find({name:req.body.name})
    res.json({users: allUsers})
  }
}))
module.exports = Router
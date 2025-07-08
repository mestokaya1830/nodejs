import express from 'express'
const Router = express.Router()
import Users from '../modules/usersSchema.js'
import wrapAsync from '../middleware/tryCatch.js'
import Cryptr from 'cryptr'
const cryptr = new Cryptr('secret')
import formValidate from '../middleware/formValidation.js'
import jwt from 'jsonwebtoken'

Router.post('/register', wrapAsync(async(req, res) => {
  const errors = formValidate(req.body.name, req.body.password)
  if(errors.length > 0){
    res.status(401).json({error:errors[0].message})
  }else{
    const checkUser = await Users.findOne({name: req.body.name})
    if(checkUser){
      res.status(401).json({error:'This user is exists!'})
    }else{
      const newUser =  new Users({
        name: req.body.name, 
        password: cryptr.encrypt(req.body.password)
      })
      await newUser.save()
      res.json({message:'Registered'})
    }
  }
}))


Router.post('/login', wrapAsync(async(req, res) => {
  const loginUser = await Users.find({name: req.body.name})
  if(loginUser.length > 0){
    let dePass = cryptr.decrypt(loginUser[0].password)
    if(req.body.password == dePass){
      const token = jwt.sign({dePass}, process.env.access_token)
      res.json({token:token})//save this token on localstorage
    }else{
      res.json({error:'Password not match'})
    }
  }else{
    res.json({error:'User not match'})
  }
}))

//logout
Router.get('/logout',  wrapAsync(async(req, res) => {
  req.session.destroy((err) => {
    res.json({message:'Logout'})
  })
}))
export default Router
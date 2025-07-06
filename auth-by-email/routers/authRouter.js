import express from 'express'
const Router = express.Router()
import Users from '../modules/usersSC.js'
import Temps from '../modules/tempSC.js'
import tryCatch from '../middleware/tryCatch.js'
import Cryptr from 'cryptr'
const cryptr = new Cryptr('secret')
import formValidate from '../middleware/formValidation.js'
import { default as sendEmail } from '../modules/email.js'
import { default as codeGen } from '../modules/tempCode.js'

Router.post('/register', tryCatch(async(req, res) => {
  const errors = formValidate(req.body.name, req.body.password, req.body.email)
  if(errors.length > 0){
    res.status(401).json({error:errors[0].message})
  } else {
    const checkUser = await Users.findOne({email: req.body.email})
    if(checkUser){
      res.status(401).json({error:'This user is exists!'})
    } else{
      const tempCode = codeGen(6)
      sendEmail(req.body.email, tempCode)
      const newTemp = new Temps({
        name: req.body.name,
        email: req.body.email,
        password: cryptr.encrypt(req.body.password),
        codeid: tempCode
      })
      await newTemp.save()
      res.json({code: '200', message:'checking resgisteration...'})
    }
  }
}))

Router.post('/checkcode', tryCatch(async(req, res) => {
  const checkOtp = await Temps.findOne({codeid: req.body.codeid})
  if(checkOtp){
    const newUser =  new Users({
      name: checkOtp.name, 
      email: checkOtp.email,
      password: cryptr.encrypt(checkOtp.password)
    })
    await newUser.save()
    res.json({codeid: '200', message:'Registration is completed'})
  } else {
    res.json({message: 'Wrong codeid!'})
  }
}))

Router.post('/login', tryCatch(async(req, res) => {
  const loginUser = await Users.find({name: req.body.name})
  if(loginUser.length > 0){
    let dePass = cryptr.decrypt(loginUser[0].password)
    if(req.body.password == dePass){
      
      res.json({message:'success'})//save this token on localstorage
    }else{
      res.json({error:'Password not match'})
    }
  }else{
    res.json({error:'User not match'})
  }
}))

//logout
Router.get('/logout',  tryCatch(async(req, res) => {
  req.session.destroy((err) => {
    res.json({message:'Logout'})
  })
}))
export default Router
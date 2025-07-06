
import express from 'express'
const app = express()
import tryCatch from './tryCatch.js'
import Cryptr from 'cryptr'
const cryptr = new Cryptr('secret')
import formValidate  from './formValidation.js'
import helmet from 'helmet'

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const user = {
  name: 'mesto',
  email: 'mesto@outlook.com',
  password: '9090'
}

app.get('/users', tryCatch(async(req, res) => {
  user.password = cryptr.decrypt(user.password)
  res.json(user)
}))

app.post('/register', tryCatch(async(req, res) => {
  //user will be come from client form
  const errors = formValidate(user.name, user.email, user.password)
  if(errors.length > 0){
    res.json({errors:errors[0].message})
  } else{
    user.password = cryptr.encrypt(user.password)
    res.json(user)
  }
}))

app.post('/login', tryCatch(async(req, res) => {
  if(user){
    let dePass = cryptr.decrypt(user.password)
    if(user.name == 'mesto' && dePass == '9090'){
      res.json('Invalid user!')
    } else{
      res.json({error:'Please register!'})
    }
  }
}))

app.use((error, req, res, next) => {
  console.log('error', {error})
  next(error)
})

//listen server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listen...')
})
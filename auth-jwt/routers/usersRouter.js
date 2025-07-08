import express from 'express'
const Router = express.Router()
import Users  from '../modules/usersSchema.js'
import wrapAsync from '../middleware/tryCatch.js'
import jwt from 'jsonwebtoken'
import checkToken from '../middleware/jwt.js'

Router.get('/users', checkToken, (req, res) => {
  //get req.token from localstorage
  jwt.verify(req.token, process.env.access_token, async (err) => {
    if(err){
      res.sendStatus(403)
    } else {
      const allUsers = await Users.find({})
      res.json({users: allUsers})
    }
    
  })
})
export default Router
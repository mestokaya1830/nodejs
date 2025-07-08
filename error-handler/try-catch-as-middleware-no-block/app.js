import express from 'express'
const app = express()
import errorHandler from './try-catch.js'
import tryCatch from './try-catch.js'

app.get('/', tryCatch(async(req, res) => {
   const user = undefined
   if(!user){
     throw new Error('User not found')
   }
  return res.status(200).json({message:'Success'})
}))

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server is running...')
})
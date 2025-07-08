import express from 'express'
const app = express()
import errorHandler from './error-handler.js'


app.get('/', async(req, res, next) => {
   //try-catch used here in block
  try {
    const user = undefined
    if(!user){
      throw new Error('User not found')
    }
  } catch (error) {
    return next(error)
  }
  return res.status(200).json({message:'Success'})
})

//global as middleware
app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server is running...')
})
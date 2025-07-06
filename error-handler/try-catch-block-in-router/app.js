import express from 'express'
const app = express()

app.get('/', async(req, res, next) => {
  //try-catch used here in block
  try {
    const user = undefined
    if(!user){
      throw new Error('User not found')
    }
  } catch (error) {
    return res.status(400).send(error.message)
  }
  return res.status(200).json({message:'Success'})
})
app.listen(3000, () => {
  console.log('Server is running...')
})
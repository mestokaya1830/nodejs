import express from 'express'
const app = express()

app.get('/', async(req, res, next) => {
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

//global in page
app.use((error, req, res, next) => {
  return res.status(400).send(error.message)
})

app.listen(3000, () => {
  console.log('Server is running...')
})
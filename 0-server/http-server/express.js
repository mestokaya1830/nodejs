import express from 'express'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
  res.send('<h2>Welcome To Nodejs Server Express Middleware</h2>')

  //or json
  // const users = [
  //     {name:'mesto', age:60},
  //     {name:'deniz',age:54},
  //     {name:'faruk',age:45}
  // ]
  // res.json({users})
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...')
})

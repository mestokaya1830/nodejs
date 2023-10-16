import express from 'express'
const app = express()

if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV)
}

//run conditional
// if (['production', 'staging'].includes(process.env.NODE_ENV)) {
//   // ...
// }

if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV)
}
//open consile and type 
//NODE_ENV=production node app.js
//NODE_ENV=development node app.js

app.listen(5000, () => {
  console.log('Server is running...')
})
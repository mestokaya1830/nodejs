import mongoose from 'mongoose'
const db = mongoose.connect('mongodb://localhost:27017/works',{
  useNewUrlParser: true
})
.then(() => console.log('Connected'))
.catch((err) => console.error(err))

export default db
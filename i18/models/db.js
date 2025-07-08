import mongoose from 'mongoose'

const db = mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected'))
.catch(err => console.log(err))

export default db
import express from 'express'
const router = express.Router()
import path from 'path'
import auth from './auth.js'

router.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'))
})

router.get('/account', auth, (req, res) => {
  res.sendFile(path.resolve('views/pages/account.html'))
})

export default router
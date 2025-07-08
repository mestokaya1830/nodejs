import express from 'express'
const router = express.Router()
import path from 'path'

router.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'))
})

router.get('/account', (req, res) => {
  res.sendFile(path.resolve('views/pages/account.html'))
})

export default router
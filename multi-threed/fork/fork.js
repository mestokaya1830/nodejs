import express from 'express'
const app = express()
import { fork } from 'child_process'

app.get('/', (req, res) => {
  const child = fork('./api.js')
  child.send('start')

  child.on('message', (data) => {
    res.send({ data })
  })
})

app.listen(4000, () => {
  console.log('Server is running...' + process.pid)
})
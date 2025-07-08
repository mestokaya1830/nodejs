import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.download('./test.txt', 'test.txt', function (err) {
    if (!err) {
      console.log('Download is completed')
    }
  })
})

app.listen(5000, () => {
  console.log('Server is running...')
})

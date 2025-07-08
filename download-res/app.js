import express from "express";
const app = express()
import helmet from 'helmet'


app.use(helmet())
app.use(express.json())
app.use(express.static('static'))

app.get('/download', (req, res) => {
  res.download('./1.mp4')
})


app.listen(3000, () => {
  console.log('Server si running...')
})
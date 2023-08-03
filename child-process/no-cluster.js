import express  from 'express'
const app = express()


function delay(duration){
  const startTime = Date.now()
  while(Date.now() - startTime < duration){
    ''
  }
}

//this route must wait for timer route finished
app.get('/', (req, res) => {
  res.send('Process id')
})

//open this route in multipple tab and check response time
app.get('/timer', (req, res) => {
  delay(9000)
  res.send('Other process id')
})

app.listen(4000, () => {
  console.log('Server is running...')
})
import express from 'express'
const app = express()
import os from 'os'
import cluster from 'cluster'

const numCpu = os.cpus().length

function delay(duration){
  const startTime = Date.now()
  while(Date.now() - startTime < duration){
    ''
  }
}

//this route dosnt wait timer route
app.get('/', (req, res) => {
  res.send('Process id'  + process.pid)
  cluster.worker.kill()
})

//open this route in multipple tab and check response time
app.get('/timer', (req, res) => {
  delay(9000)
  res.send('Other process id'  + process.pid)
  cluster.worker.kill()
})

if(cluster.isPrimary) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(worker.process.pid + 'is died')
    cluster.fork() //start new worker after current is died
  })
} else {
  app.listen(3000, () => {
    console.log('Server is running...' + process.pid)
  })
}

//npm i loadtest then type this code on second terminal loadtest -n 1000 -c 100 http://localhost:3000
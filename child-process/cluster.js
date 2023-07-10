const express = require('express')
const app = express()
const os = require('os')
const cluster = require('cluster')

const numCpu = os.cpus().length

app.get('/', (req, res) => {
  res.send('Process id'  + process.pid)
  cluster.worker.kill()
})
app.get('/test', (req, res) => {
  res.send('Other process id'  + process.pid)
  cluster.worker.kill()
})

if(cluster.isMaster) {
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
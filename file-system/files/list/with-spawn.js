const cp = require('child_process')
const path = require('path')


const child = cp.spawn('ls', ['-al'])

//get files and folders
child.stdout.on('data', (data) => {
  console.log(data + '\n')
})
//shor errors
child.stderr.on('data', (err) => {
  console.log(err)
})
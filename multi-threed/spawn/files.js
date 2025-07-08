const cp = require('child_process')

//get files and folders
const child = cp.spawn('ls', ['-al'])

//show result info
child.stdout.on('data', (data) => {
  console.log(data + '\n')
})
//shor errors
child.stderr.on('data', (err) => {
  console.log(err)
})

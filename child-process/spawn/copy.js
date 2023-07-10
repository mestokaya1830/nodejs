const cp = require('child_process')

//copy file
const child = cp.spawn('cp', ['copy.js', 'copy2.js'])

//show result info
child.on('exit', () => {
  console.log('File copied')
})
//shor errors
child.stderr.on('data', (err) => {
  console.log(err)
})
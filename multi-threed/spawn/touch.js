const cp = require('child_process')


const child = cp.spawn('touch', ['test.js'])

//create file
child.on('exit', () => {
  console.log('File created')
})
//shor errors
child.stderr.on('data', (err) => {
  console.log(err)
})
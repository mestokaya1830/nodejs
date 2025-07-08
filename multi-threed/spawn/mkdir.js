const cp = require('child_process')


const child = cp.spawn('mkdir', ['test'])

//create folder
child.on('exit', () => {
  console.log('Folder created')
})
//shor errors
child.stderr.on('data', (err) => {
  console.log(err)
})
const cp = require('child_process')


const child = cp.spawn('rm', ['-r', 'test'])

//remove folder and files
child.on('exit', () => {
  console.log('Folder and File removed')
})
//shor errors
child.stderr.on('data', (err) => {
  console.log(err)
})
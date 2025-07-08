const cp = require('child_process')

cp.exec('ls -al' ,function(error, stdout, stderr) {
  if (!error) {
   console.log(stdout) 
  }
})
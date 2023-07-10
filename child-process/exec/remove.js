const cp = require('child_process')

cp.exec('rm -r test',function(error, stdout, stderr) {
  if (!error) {
    console.log("Folder removed")
  }
})
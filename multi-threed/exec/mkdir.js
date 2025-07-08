const cp = require('child_process')

cp.exec('mkdir test',function(error, stdout, stderr) {
  if (!error) {
    console.log("Folder created")
  }
})
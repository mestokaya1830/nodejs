const cp = require('child_process')

cp.exec('touch test.js',function(error, stdout, stderr) {
  if (!error) {
    console.log("File created")
  }
})
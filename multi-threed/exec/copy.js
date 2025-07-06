const cp = require('child_process')

cp.exec('cp mongo.js mongo2.js',function(error, stdout, stderr) {
  if (!error) {
    console.log("File copied")
  }
})
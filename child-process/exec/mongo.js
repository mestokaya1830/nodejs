const cp = require("child_process")

const cmd = "mongodump --host " + "localhost" + " --db " + "works"
cp.exec(cmd, function(error, stdout, stderr) {
  if (!error) {
    console.log("DB backup generated ... ")
  }
})

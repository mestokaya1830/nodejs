const { spawn } = require('child_process')
const cron = require('node-cron')

cron.schedule('*/5 * * * * *', () => backupMongo())

function backupMongo() {
  //backup
  const child = spawn('mongodump', [
    '--db=' + 'works',
    '--host=' + 'localhost'
  ])
  //show result info
  child.on('exit', (code, signal) => {
    if (code)
      console.log('Backup process exited with code ', code);
    else if (signal)
      console.error('Backup process was killed with singal ', signal);
    else
      console.log('Successfully backedup the database')
  })
}
backupMongo()

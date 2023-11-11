import cron from 'node-cron'
import { spawn } from 'child_process'
cron.schedule('*/1 * * * *', () => {
  const d = new Date()
  let backupProcess = spawn('mongodump', [
    '--db=bet', 
    `--out=./${d.toDateString()}`,
    '--authenticationDatabase=admin',
    '--username=Boss',
    '--password=9090',
    ]);

  backupProcess.on('exit', (code, signal) => {
      if(code) 
          console.log('Backup process exited with code ', code);
      else if (signal)
          console.error('Backup process was killed with singal ', signal);
      else 
          console.log('Successfully backedup the database')
  });
});

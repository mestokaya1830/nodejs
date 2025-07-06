import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Enter your name?", (name) => {
  console.log("Your Name: " +' '+ name)
  rl.close()
})

rl.on('close', () => {
  console.log('Closed')
  process.exit(0)
})

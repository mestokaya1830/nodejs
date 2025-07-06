import fs from 'fs'

//simple pipe
const readStream = fs.createReadStream('./import.mp4')
const writeStream = fs.createWriteStream('./export.mp4')
readStream.pipe(writeStream)

readStream.on('end', () => {
  const size = fs.statSync('./video.mp4').size
  console.log('Readstrem is finished KB', Math.floor(size / (1204)).toFixed(0))
})

writeStream.on('finish', () => {
  console.log('Writestream is completed')
})


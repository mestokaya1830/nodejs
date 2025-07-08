import fs from 'fs'

// const rs = fs.createReadStream('./movie.mp4')
// const readStream = fs.createReadStream('./movie.mp4', {highWaterMark: 10000})
const readStream = fs.createReadStream('./movie.mp4')//for pipe you dont need highWaterMark
const writeStream = fs.createWriteStream('./movi2.mp4')

readStream.on('data', (chunk) => {
  console.log(chunk)
  console.log(chunk.length)
  // console.log(chunk.toString())
  writeStream.write(chunk)
})

readStream.on('end', () => {
  writeStream.end()
  const size = fs.statSync('./movie.mp4').size
  console.log('Strem is finished KB', Math.floor(size / (1204)).toFixed(0))
})
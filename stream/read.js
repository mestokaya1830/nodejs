import fs from 'fs'

// const rs = fs.createReadStream('./movie.mp4')
const readStream = fs.createReadStream('./video.mp4', {highWaterMark: 10000})

readStream.on('data', (chunk) => {
  console.log(chunk)
  console.log(chunk.length)
  // console.log(chunk.toString())//for json,csv and text
})

readStream.on('end', () => {
  const size = fs.statSync('./video.mp4').size
  console.log('Strem is finished KB ', Math.floor(size / (1204)).toFixed(0))
})

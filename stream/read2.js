import fs from 'fs'

const readStream = fs.createReadStream('./movie.mp4', {highWaterMark: 100})
const ws = fs.createReadStream('./wrote.mp4', {highWaterMark: 100})
// const rs = fs.createReadStream('./soccer.json')
// const ws = fs.createWriteStream('./soccer.json')

const size = fs.statSync('./movie.mp4').size
console.log('KB', (size / 1024).toFixed(2))
console.log('MB', (size / (1024*1024)).toFixed(2))
console.log('GB', (size / (1024*1024*1024)).toFixed(2))
// return false
// fs.stat('./movie.mp4', (error, data) => {
//   const fileSize = data.size;
//   let chunkSize = 0, oldSize = 0, lastSize = 0;
//   readStream.on("data", chunk => {
//     chunkSize += chunk.length
//     lastSize = Math.round(chunkSize * 100 / fileSize)
//     if (oldSize != lastSize){
//        console.log(`${lastSize}%`)
//     }
//     oldSize = lastSize
//   })

//   // readStream.pipe(writeStream);
//   // writeStream.on("finish", () => {
//   //   console.log("Yazma tamamlandı...")
//   // })
// })

// readStream.on('end', () => {
//   console.log('Strem is finished.')
// })
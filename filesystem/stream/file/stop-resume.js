import fs from 'fs'
import { setTimeout } from 'timers'

const main = async () => {
  const rs = fs.createReadStream('./soccer.json', {highWaterMark: 20})//small chunk or buffer speed 

  let chunkCount = 0
  rs.on('data', (chunk) => {
    console.log(chunk.toString())
    if(chunkCount == 5){
      rs.pause()
      setTimeout(() => {
        rs.resume()
      }, 3000);
    }
    chunkCount++
  })
  
  rs.on('end', () => {
    console.log('Fnished')
  })
}
main()
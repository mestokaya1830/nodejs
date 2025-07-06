import fs from 'fs'

const main = async () => {
  const rs = fs.createReadStream('./soccer.json',{highWaterMark: 1})
  const ws = fs.createWriteStream('./createdstream.json')

  
  rs.on("data", (chunk) => {
    console.log(chunk.toString())
  })
  
  rs.on('end', () => {
    console.log('Read stream ended!')
  })
  
  rs.pipe(ws)//prevent Backpressuring
  ws.on('finish', () => {
    console.log('Write stream finished!')
  })
}
main()
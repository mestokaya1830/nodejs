const fs = require('fs')

const main = async () => {
  const rs = fs.createReadStream('./soccer.json')
  const ws = fs.createWriteStream('./createdstream.json')

  
  rs.on("data", (buffer) => {
    console.log(buffer.toString())
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
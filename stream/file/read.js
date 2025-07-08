import fs from 'fs'

const main = async () => {
  const rs = fs.createReadStream('./soccer.json', {highWaterMark: 100})//small chunk or buffer speed 

  rs.on('data', (buffer) => {
    console.log(buffer.toString())
  })
  rs.on('end', () => {
    console.log('Fnished')
  })
}
main()
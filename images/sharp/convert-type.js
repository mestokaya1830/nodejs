const fs = require('fs')
const sharp = require('sharp')
  
  const convert_type = async() => {
    try{
      const image = await sharp('./images/1.png').png().toBuffer()
      fs.writeFileSync('./finished/1.jpg', image)
    } catch (error){
      console.log(error)
    }
  }
  convert_type()
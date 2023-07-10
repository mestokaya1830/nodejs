const fs = require('fs')
const sharp = require('sharp')
  
  const convert_gray = async() => {
    try{
      const image = await sharp('./images/1.png').grayscale().png().toFile('./finished/gray.png')
    } catch (error){
      console.log(error)
    }
  }
  convert_gray()
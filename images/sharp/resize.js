const fs = require('fs')
const sharp = require('sharp')
  
  const resize = async() => {
    try{
      const image = await sharp('./images/1.png').resize(400, 400).png().toFile('./finished/resized.png')
    } catch (error){
      console.log(error)
    }
  }
  resize()
const fs = require('fs')
const sharp = require('sharp')
  
  const threshold = async() => {//convert to black and white
    try{
      const image = await sharp('./images/1.png').threshold(100).png().toFile('./finished/black.png')
    } catch (error){
      console.log(error)
    }
  }
  threshold()
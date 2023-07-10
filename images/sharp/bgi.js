const fs = require('fs')
const sharp = require('sharp')
  
  const bgi = async() => {
    try{
      const image = await sharp({
        create:{
          width: 600,
          height: 400,
          channels: 4,
          background: {r: 255, g: 100, b: 255, alpha: 0.5}
        }
      }).png().toFile('./finished/bgi.png')
    } catch (error){
      console.log(error)
    }
  }
  bgi()
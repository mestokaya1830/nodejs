const fs = require('fs')
const sharp = require('sharp')
  
  const modulate = async() => {
    try{
      const image = await sharp('./images/1.png').modulate({
        hue: 100,
        brightness: Math.random() * 2,
        saturation: Math.random() * 1,
      }).png().toFile('./finished/modulate.png')
    } catch (error){
      console.log(error)
    }
  }
  modulate()
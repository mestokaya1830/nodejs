const fs = require('fs')
const sharp = require('sharp')
  
  const blur = async() => {
    try{
      const image = await sharp('./images/1.png').blur(5).png().toFile('./finished/blur.png')
    } catch (error){
      console.log(error)
    }
  }
  blur()
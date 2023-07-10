const fs = require('fs')
const sharp = require('sharp')
  
  const recomb = async() => {
    try{
      const image = await sharp('./images/1.png').recomb([
        [Math.random() * 0.1, Math.random() * 0.3, Math.random() * 0.5],
        [Math.random() * 0.6, Math.random() * 0.7, Math.random() * 0.5],
        [Math.random() * 0.9, Math.random() * 0.6, Math.random() * 0.4]
      ]).png().toFile('./finished/recomb.png')
    } catch (error){
      console.log(error)
    }
  }
  recomb()
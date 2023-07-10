const fs = require('fs')
const sharp = require('sharp')
  
  const meta_date = async() => {
    try{
      const info = await sharp('./images/1.png').png().metadata()
      console.log(info)
    } catch (error){
      console.log(error)
    }
  }
  meta_date()
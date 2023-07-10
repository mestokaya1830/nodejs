import express from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'
import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs'

app.use(cors())
app.use(helmet())
app.use(express.static('static'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const fileFilter = function (req, file, cb) {
  const types = ['image/jpeg','image/jpg','image/png','image/gif']
  if(!types.includes(file.mimetype)){
    const error = new Error('Wrong file type')
    error.code = 'LIMIT_FILE_TYPES'
    return cb(error, false)
  }
  cb(null, true)
}
const max_size = 2000000

const resize = multer({
  storage,
  // fileFilter,
  // limits:{
  //   fileSize: max_size
  // }
})

app.post('/resize', resize.array('files', 2), async (req, res, ) => {
  try {
    //resize and move to resized folder
    const originalName = []
    for (const item of req.files) {
      await sharp(item.path)
      .resize(300)
      .toFile('./static/resized/' + item.originalname)

      //delete original file
      fs.unlink(item.path, () => {
        originalName.push(item.originalname)
      })
    }
    res.status(200).json({files:req.files})
  } catch (error) {
    console.log(error)
  }
})

app.use((error, req, res, next) => {
  console.log(error)
  if(error.code == 'LIMIT_FILE_TYPES'){
    res.json({error:'Wrong file type!'})
  }
  if(error.code == 'LIMIT_FILE_SIZE'){
    res.json({error:'File to large! Limit' +' '+ max_size/100 +' '+ 'kb'})
  }
})

export default {
  path: '/api',
  handler: app
}
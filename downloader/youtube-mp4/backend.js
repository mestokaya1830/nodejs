const fs = require('fs')
const ytdl = require('ytdl-core')

const video = ytdl('http://www.youtube.com/watch?v=e_RsG3HPpA0',{
  quality: 18,
  format: 'mp4',
})
video.on('progress', function(info) {
  console.log('Download progress')
})
video.on('end', function(info) {
  console.log('Download finish')
})

video.pipe(fs.createWriteStream('video.mp4'))
const fs = require('fs')
const ytdl = require('ytdl-core')

const video = ytdl('http://www.youtube.com/watch?v=e_RsG3HPpA0',{
  format: 'mp3',
  filter: 'audioonly'
})
video.on('progress', function(info) {
  console.log('Download progress')
})
video.on('end', function(info) {
  console.log('Download finish')
})

video.pipe(fs.createWriteStream('video.mp3'))
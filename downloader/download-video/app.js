import fs from 'fs'
import http from 'http'
import https from 'https'
import { URL } from 'url'

const videoList = [
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/no0jF1g/videoblocks-aerial-germany-9926-berlin-june-2018-sunny-day-15mm-wide-angle-4k-inspire-2_boesirv7ue__9a67bc489490be579b2bd967a3bd8e3c__P360.mp4",
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/GTYSdDW/aerial-vast-mountain-wall-in-european-alps_vjdiq-m9__f5a839fa4c73b654a5f950710a5eb8e9__P360.mp4",
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/SfgTbYmNJXjhkhi5b7/videoblocks-paul-oostveen-b17-05_sybkofces__aae05ee030726a1e649870aeed12e02c__P360.mp4",
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/49EwKH5deijotr386/videoblocks-view-from-the-height-of-the-road-on-which-cars-are-moving-the-road-is-shrouded-in-fog_rhobq1iye__a0e5e006ac31321f5f769bfb55bc3ec4__P360.mp4",
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HyK36gOdmjm0pmnp3/videoblocks-aerial-mystic-shot-flying-over-a-cloudy-forest-discovering-a-cliff-in-vercors-france-sunny-morning_h_gc4gwgsx__a798a798f417ed24ed5acebe62ff9df8__P360.mp4",
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HJpjKMlmgiw923pte/videoblocks-aerial-view-of-farming-tractor-spraying-on-field-with-sprayer-herbicides-and-pesticides-at-sunset-farm-machinery-spraying-insecticide-to-the-green-field-agricultural-natural-seasonal-sprin__0619c805fcef446232f0deacb84d3b04__P360.mp4"
]


function downloadFfile(url, state) {
  const userUrl = new URL(url)
  const uerlType = userUrl.protocol === 'http:' ? http : https

  const filename = 'videos/' + url.split('/').pop()//get text after last slash

  const req = uerlType.get(url, function (res) {
    const fileStream = fs.createWriteStream(filename)
    res.pipe(fileStream)

    fileStream.on('error', function(error){
      console.log(error)
    })

    fileStream.on('close', function(error){
      state(filename)//return completed message
    })

    fileStream.on('finished', function(error){
      fileStream.close()
    })

  })

  req.on('error',function(error) {
    console.log(error)
  })
}

//loop downloadFfile function in foreach for multiple videos
videoList.forEach(item => {
  downloadFfile(item, () => {
    console.log('Download complete!')
  })
})
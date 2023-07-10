const startChat = (id) => {
  document.getElementById('chat-panel').removeAttribute('style')
  document.getElementById('div-start').setAttribute('style','display:none')
  hideChatList()
}
const showChatList = () => {
  document.getElementById('side-1').classList.remove('d-none', 'd-md-block')
  document.getElementById('side-2').classList.add('d-none')
}
const hideChatList = () => {
  document.getElementById('side-1').classList.add('d-none', 'd-md-block')
  document.getElementById('side-2').classList.remove('d-none')
}
const onKeyDown = () => {
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      sendMsg()
    }
  })
}



const selectImg = () => {
  document.getElementById('img').click()
}

const sendImg = (e) => {
  let file = e.files[0]
  if (!file.type.match("image.*")) {
    alert('Please select an image!')
  } else {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      document.getElementById('msg').value = reader.result
    }, false)
    if(file) {
      reader.readAsDataURL(file)
    }
  }
  removeStyle()
}
const sendMsg = () => {
  if(document.getElementById('msg').value !== ''){
    if (document.getElementById('msg').value.includes('base64')) {
      document.getElementById('message-area').innerHTML += `<div class="row justify-content-end">
        <div class="col-6 col-sm-7 col-md-7" style="display: contents;">
          <p class="sender">
          <img src="${document.getElementById('msg').value}" alt="" width="200px" height="150px">
            <span class="time float-right">1:23:56</span>
          </p>
        </div>
        <div class="col-2 col-sm-1 col-md-1">
          <span class="ppic">🤠 </span>
        </div>
      </div>`
    } else if (document.getElementById('msg').value.includes('blob')) {
      document.getElementById('message-area').innerHTML += `<div class="row justify-content-end">
        <div class="col-6 col-sm-7 col-md-7" style="display: contents;">
          <p class="sender">
          <audio id="audio" controls style="height:20px;"><source src="${document.getElementById('msg').value}" type="audio/webm"></audio>
            <span class="time float-right">1:23:56</span>
          </p>
        </div>
        <div class="col-2 col-sm-1 col-md-1">
          <span class="ppic">🤠 </span>
        </div>
      </div>`
    } else {
      document.getElementById('message-area').innerHTML += `<div class="row justify-content-end">
        <div class="col-6 col-sm-7 col-md-7" style="display: contents;">
          <p class="sender">
            ${document.getElementById('msg').value}
            <span class="time float-right">1:23:56</span>
          </p>
        </div>
        <div class="col-2 col-sm-1 col-md-1">
          <span class="ppic">🤠 </span>
        </div>
      </div>`
    }
    document.getElementById('msg').value = ''
    document.getElementById('msg').focus()
    document.getElementById('message-area').scrollTo(0, document.getElementById('message-area').clientHeight)
  }
}
const changeSendIcon = (e) => {
  if(e.value !== '') {
    document.getElementById('send').removeAttribute('style')
    document.getElementById('record').setAttribute('style', 'display:none')
  } else {
    document.getElementById('record').removeAttribute('style')
    document.getElementById('send').setAttribute('style', 'display:none')
  }
}
const removeStyle = () => {
  document.getElementById('send').removeAttribute('style')
  document.getElementById('record').setAttribute('style', 'display:none')
}

let timeout = ''
let recorder;
let addAudio = ''
const record = () => {
  let device = navigator.mediaDevices.getUserMedia({audio: true})
  let chunks = []
  device.then(stream => {
    recorder = new MediaRecorder(stream)
    recorder.ondataavailable = (e) => {
      chunks.push(e.data)
      if(recorder.state === 'inactive'){
        let blob = new Blob(chunks, {type: 'audio/webm'})
        document.getElementById('msg').value  = URL.createObjectURL(blob)
        document.getElementById('audio').innerHTML = '<source src"' + URL.createObjectURL(blob) + '" type="audio/webm" />'
      }
    }
  })
  timeout = setTimeout(() => {
    recorder.start()
  }, 100)
}
const stop = () => {
  recorder.stop()
  clearInterval(timeout)
  removeStyle()
}
const socket = io()

const parseUrl = new URLSearchParams(window.location.search)
const { username, room } = {
  username:parseUrl.get('username'),
  room:parseUrl.get('room') 
}

socket.emit('joinRoom', { username, room })

socket.on('joinRoom', ({ room, users }) => {
  document.getElementById('room-name').innerText = room
  document.getElementById('users').innerHTML = ''
  users.forEach((user) => {
    const li = document.createElement('li')
    li.innerText = user.username
    document.getElementById('users').appendChild(li)
  })
})

// Message from server
socket.on('message', (message) => {
  outputMessage(message)
  document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight
})

// Message submit
document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault()
  // Get message text
  let msg = e.target.elements.msg.value
  msg = msg.trim()
  if (!msg) {
    return false
  }
  socket.emit('chatMessage', msg)
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

// Output message to DOM
const outputMessage = (message) => {
  const div = document.createElement('div')
  div.classList.add('message')
  const p = document.createElement('p')
  p.classList.add('meta')
  p.innerText = message.username
  p.innerHTML += `<span>${message.time}</span>`
  div.appendChild(p)
  const para = document.createElement('p')
  para.classList.add('text')
  para.innerText = message.text
  div.appendChild(para)
  document.querySelector('.chat-messages').appendChild(div)
}

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?')
  if (leaveRoom) {
    window.location = '/'
  }
})

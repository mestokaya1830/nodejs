import request from 'sync-request'
function getApi() {
  const result = request('GET', 'https://jsonplaceholder.typicode.com/users')
  return JSON.parse(result.getBody('utf8'))
}

process.on('message', (message) => {
  if (message === 'start') {
    const data = getApi()
    process.send(data)
  }
})
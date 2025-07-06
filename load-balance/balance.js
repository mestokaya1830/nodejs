import axios from 'axios'

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003"
]

let current = 0
let server = 0

const balance = async(req, res) => {
  const { method, url, headers, body: data } = req
  server = servers[current]
  current === (servers.length - 1) ? current = 0 : current++
  try {
    const response = await axios({
      url: server + url,
      method,
      headers,
      data
    })
    console.log(`proxy to  ${server} succeded`)
    res.send(response.data)
  }catch (err) {
    console.log(`proxy to ${server} failed`)
    balance(req, res)
  }
}

export default balance
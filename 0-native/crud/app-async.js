const http = require('http')
const fs = require('fs')
let person = require('./person.json')


http.createServer((req, res) => {
  async function getPerson(req, res, param) {
    let final = await param
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(final))
  }
//get person
  if (req.method === 'GET' && req.url === '/api/person') {
    getPerson(req, res, person)
//filter person
  } else if (req.method === 'GET' && req.url.match(/\/api\/person\/([0-9]+)/)) {
    const id = req.url.split('/')[3]
    const findPerson = person.find(item => item.id = id)
    getPerson(req, res, findPerson)
//add person
  } else if (req.method === 'POST' && req.url === '/api/person') {
    let newPerson = {
      id:6,
      name: 'Kim',
      age: 33
    }
    person.push(newPerson)
    fs.writeFileSync('./person.json', JSON.stringify(person), 'utf8', (err => {
      err ? console.log(err) : console.log('Saved')
    }))
    getPerson(req, res, person)
//update person
  } else if (req.method === 'PUT' && req.url.match(/\/api\/person\/([0-9]+)/)) {
    const id = req.url.split('/')[3]
    const findIdndex = person.findIndex(item => item.id == id)
    person[findIdndex] = {
      id,
      name:'Eko',
      age:19
    }
    fs.writeFileSync('./person.json', JSON.stringify(person), 'utf8', (err => {
      err ? console.log(err) : console.log('Updated')
    }))
    getPerson(req, res, person)
//remove person
  } else if (req.method === 'DELETE' && req.url.match(/\/api\/person\/([0-9]+)/)) {
    const id = req.url.split('/')[3]
    const result = person.filter(item => item.id != id)
    fs.writeFileSync('./person.json', JSON.stringify(result), 'utf8', (err => {
      err ? console.log(err) : console.log('Removed')
    }))
    getPerson(req, res, id)
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ "message": "Url not found" }))
  }
}).listen(3000, () => {
  console.log('Server is running...')
})
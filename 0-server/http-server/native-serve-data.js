//native mode---------------------------------
import http from 'http'
http.createServer(function (req, res) {
    //send html
    //res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    // res.end('<h2>Welcome To NodeJs Server Native Version</h2>')

    //send json
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    const users = [
        {name:'mesto', age:60},
        {name:'deniz',age:54},
        {name:'faruk',age:45}
    ]
    res.end(JSON.stringify(users))
}).listen(3000, () => {
    console.log('Server is running...')
})

//native mode-------------------------------------
// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
//   res.write('<html>')
//     res.write('<body>')
//       res.write('<h2 style="color:darkblue;">')
//         res.write('Welcome To Native Server')
//       res.write('</h2>')
//       res.write('<p>')
//         res.write('Hello')
//       res.write('</p>')
//     res.write('<body>')
//   res.write('</html>')
//   res.end()
// });
// server.listen(process.env.PORT || 3000)

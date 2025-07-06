import mysql from 'mysql2'

//with promise and run query as async await
// import mysql from 'mysql2'

// const db = mysql.createPool({
//   host:'localhost',
//   user:'mesto',
//   password:'mk1972mk',
//   database:'blog'
// }).promise()


// export default db

// const result = await Mysql.query('Insert Into users(username, email, password)Values(?,?,?)',[username, email, cryptr.encrypt(password)])
//   console.log(result)


// with this rrun query as callbak
// const db = mysql.createConnection({
//   host:'localhost',
//   user:'mesto',
//   password:'mk1972mk',
//   database:'blog'
// })

// db.connect(err => {
//   if(!err) console.log('Mysql Connected')
// })

// export default db

// Mysql.query('Insert Into users(username, email, password)Values(?,?,?)',[username, email, cryptr.encrypt(password)], (err, res) => {
//   console.log(res)
// })

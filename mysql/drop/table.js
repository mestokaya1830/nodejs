import mysql from'../db.js'

try {
  const conn = await mysql.getConnection()
  conn.release()
  await conn.query(`DROP TABLE users;`)
  console.log('Deleted')
} catch (error) {
  console.log(error)
}
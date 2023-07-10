import mysql from "../db.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const result = await conn.query(`SELECT * FROM users;`);
  console.log(result[0]);
} catch (error) {
  console.log(error);
}
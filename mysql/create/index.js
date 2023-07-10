import mysql from "../db.js";

try {
  const conn = await mysql.getConnection();
  conn.release();
  const column = await conn.query(`CREATE INDEX idx_name ON Users (name)`);
  console.log("Index Added");
} catch (error) {
  console.log(error);
}
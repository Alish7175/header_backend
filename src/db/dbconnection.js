import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port:process.env.DB_PORT, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
  connection.release(); // Release the connection back to the pool
});
export default pool;

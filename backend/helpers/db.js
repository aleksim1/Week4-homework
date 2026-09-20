const mysql = require("mysql2/promise");

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
};

const query = async (sql, values = []) => {
  const p = getPool();
  const [rows] = await p.query(sql, values);
  return rows;
};

module.exports = {
  query,
};

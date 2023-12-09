import mysql2 from "mysql2/promise";

export default async function conectar() {
  if (global.poolConexoes) {
    return await global.poolConexoes.getConnection();
  } else {
    const pool = mysql2.createPool({
      host: "localhost",
      port: 3306,
      database: "sistema",
      user: "root",
      password: "vm651854",
      waitForConnections: true,
      connectionLimit: 1000,
      maxIdle: 1000,
      idleTimeout: 200000,
      queueLimit: 0,
    });

    global.poolConexoes = pool;
    return await pool.getConnection();
  }
}

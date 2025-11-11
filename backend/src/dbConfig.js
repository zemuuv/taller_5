require("dotenv").config();
const sql = require("mssql");

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,         // Usuario SQL
  password: process.env.DB_PASSWORD, // Contraseña SQL
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log("✅ Conectado a SQL Server");
  } catch (err) {
    console.error("❌ Error de conexión:", err.message);
  }
}

module.exports = { sql, config, connectDB };

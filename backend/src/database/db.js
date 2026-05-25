import pkg from "pg";
import dotenv from "dotenv";

// Carrega variáveis do .env
dotenv.config();

const { Pool } = pkg;

// Conexão PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
});

export default pool;
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const formatoColombiano = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

async function conexion() {
  try {
    const result = await pool.query('select * from public."productos"');
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  }finally {
  await pool.end();
}}
conexion();
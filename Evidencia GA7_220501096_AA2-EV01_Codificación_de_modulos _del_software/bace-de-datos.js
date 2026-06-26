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

async function crear(name, description, image, price) {
  const resultado = await pool.query(
    'INSERT INTO public."Productos" (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, image, price],
  );
  return resultado.rows[0];
}
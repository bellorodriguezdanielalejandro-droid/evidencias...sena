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

// Crear producto
async function crear(id, name, description, image, price, create_at) {
  const resultado = await pool.query(
    `INSERT INTO public.productos
    (id, name, description, image, price, create_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [id, name, description, image, price, create_at]
  );

  return resultado.rows[0];
}

// Listar productos
async function listar() {
  const resultado = await pool.query(
    "SELECT * FROM public.productos"
  );

  return resultado.rows;
}

// Obtener un producto 
async function obtener(id) {
  const resultado = await pool.query(
    'SELECT * FROM public.productos WHERE id = $1',
    [id]
  );

  return resultado.rows[0];
}

// Actualizar producto
async function actualizar(
  id,
  name,
  description,
  image,
  price,
  create_at
) {
  const resultado = await pool.query(
    `UPDATE public.productos
    SET name = $2,
        description = $3,
        image = $4,
        price = $5,
        create_at = $6
    WHERE id = $1
    RETURNING *`,
    [id, name, description, image, price, create_at]
  );

  return resultado.rows[0];
}

// Eliminar producto
async function eliminar(id) {
  const resultado = await pool.query(
    'DELETE FROM public.productos WHERE id = $1 RETURNING *',
    [id]
  );

  return resultado.rows[0];
}
module.exports = {
  pool,
  formatoColombiano,
  crear,
  listar,
  obtener,
  actualizar,
  eliminar,
};





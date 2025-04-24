const express = require('express')
const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

app.use(express.json())

// Endpoint para cadastrar uma denúncia
app.post('/denuncias', async (req, res) => {
  const { titulo, descricao } = req.body
  const result = await pool.query(
    'INSERT INTO denuncias (titulo, descricao) VALUES ($1, $2) RETURNING *',
    [titulo, descricao],
  )
  res.status(201).json(result.rows[0])
})

// Endpoint para listar as denúncias
app.get('/denuncias', async (req, res) => {
  const result = await pool.query('SELECT * FROM denuncias')
  res.json(result.rows)
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})

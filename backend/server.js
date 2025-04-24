const express = require('express')
const cors = require('cors') // <-- importe o CORS
const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Ativa o CORS para todas as origens (pode restringir se quiser)
app.use(cors()) // <-- habilita o CORS
app.use(express.json())

app.post('/denuncias', async (req, res) => {
  const { nome, email, cep, endereco, numero, complemento, descricao } =
    req.body

  if (!nome || !email || !cep || !endereco || !numero || !descricao) {
    return res
      .status(400)
      .json({ error: 'Campos obrigatórios estão faltando.' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO denuncias (nome, email, cep, endereco, numero, complemento, descricao)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING uuid, created_at`,
      [nome, email, cep, endereco, numero, complemento, descricao],
    )

    res.status(201).json({
      message: 'Denúncia registrada com sucesso!',
      data: result.rows[0],
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao registrar denúncia.' })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

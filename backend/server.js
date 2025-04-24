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

// Endpoint para listar as denúncias
app.get('/', async (req, res) => {
  try {
    // Fetch books from your database using the postgres connection
    const { rows } = await pool.query('SELECT * FROM books_to_read;')
    res.json(rows)
  } catch (error) {
    console.error('Failed to fetch books', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

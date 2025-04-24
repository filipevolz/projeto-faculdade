const express = require('express')
const cors = require('cors') // <-- importe o CORS
const { Pool } = require('pg')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Ativa o CORS para todas as origens (pode restringir se quiser)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
) // <-- habilita o CORS
app.use(express.json())
app.use(cookieParser())

app.post('/register', async (req, res) => {
  const { nome, email, password } = req.body

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!nome || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Nome, email e senha são obrigatórios.' })
  }

  try {
    // Verifica se o email já está cadastrado
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    )
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email já cadastrado.' })
    }

    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insere o novo usuário no banco de dados
    const result = await pool.query(
      `INSERT INTO users (nome, email, password)
       VALUES ($1, $2, $3)
       RETURNING uuid, nome, email, created_at`,
      [nome, email, hashedPassword],
    )

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      data: result.rows[0],
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar usuário.' })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Verifica se o usuário existe
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' })
    }

    // Compara as senhas
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta.' })
    }

    // Gera o token JWT
    const token = jwt.sign(
      { uuid: user.uuid, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )

    res
      .cookie('token', token, {
        httpOnly: true, // Não acessível via JavaScript (mais seguro)
        secure: false, // Coloque `true` em produção com HTTPS
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hora
      })
      .json({ message: 'Login realizado com sucesso!' })
  } catch (err) {
    console.error('Erro ao realizar login:', err)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
})
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

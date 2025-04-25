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
        secure: true, // Coloque `true` em produção com HTTPS
        sameSite: 'none',
        maxAge: 60 * 60 * 1000, // 1 hora
      })
      .json({ message: 'Login realizado com sucesso!' })
  } catch (err) {
    console.error('Erro ao realizar login:', err)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
})
app.post('/reports', async (req, res) => {
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

app.get('/reports', async (req, res) => {
  try {
    // Pegue o número da página e a quantidade de itens por página a partir dos parâmetros da query
    const page = parseInt(req.query.page) || 1  // Pega o número da página, se não for passado, assume a página 1
    const perPage = parseInt(req.query.per_page) || 10  // Pega a quantidade de itens por página, se não for passado, assume 12

    // Pega o termo de busca (se existir)
    const searchTerm = req.query.q || ''

    // Calcula o offset com base na página
    const offset = (page - 1) * perPage

    // Consulta SQL com LIMIT, OFFSET e pesquisa (se houver)
    const result = await pool.query(
      `
        SELECT * 
        FROM denuncias 
        WHERE 
          LOWER(nome) LIKE LOWER($1) 
          OR LOWER(email) LIKE LOWER($1) 
          OR LOWER(descricao) LIKE LOWER($1)
        ORDER BY created_at DESC 
        LIMIT $2 OFFSET $3
      `,
      [`%${searchTerm}%`, perPage, offset]
    )

    // Consulta para contar o total de registros, levando em consideração a pesquisa (se houver)
    const totalResult = await pool.query(
      `
        SELECT COUNT(*) 
        FROM denuncias 
        WHERE 
          LOWER(nome) LIKE LOWER($1) 
          OR LOWER(email) LIKE LOWER($1) 
          OR LOWER(descricao) LIKE LOWER($1)
      `,
      [`%${searchTerm}%`]
    )
    const totalCount = totalResult.rows[0].count

    // Envia a resposta com os dados e o total de registros
    res.status(200).json({
      data: result.rows,
      totalCount: totalCount,
    })
  } catch (err) {
    console.error('Erro ao buscar denúncias:', err)
    res.status(500).json({ error: 'Erro ao buscar denúncias.' })
  }
})

app.get('/reports/:uuid', async (req, res) => {
  const { uuid } = req.params

  try {
    const result = await pool.query(
      `SELECT * FROM denuncias WHERE uuid = $1`,
      [uuid]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Denúncia não encontrada.' })
    }

    res.status(200).json(result.rows[0])
  } catch (err) {
    console.error('Erro ao buscar denúncia por UUID:', err)
    res.status(500).json({ error: 'Erro ao buscar denúncia.' })
  }
})

app.get('/auth/validate', (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ authenticated: false })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({ authenticated: true, user: decoded })
  } catch (err) {
    return res.status(401).json({ authenticated: false })
  }
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

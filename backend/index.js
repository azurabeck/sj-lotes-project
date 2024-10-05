/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./authMiddleware'); // Importando o middleware de autenticação

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = process.env.JWT_SECRET || 'supersecretkey';
const saltRounds = 10; // Número de rounds para gerar o salt do bcrypt
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// Configurar CORS para permitir o frontend fazer requisições ao backend
app.use(cors({
  origin: ['http://localhost:3000', NEXT_PUBLIC_BACKEND_URL], // Permitir origens específicas
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Habilitar o uso de cookies
app.use(cookieParser());

// Middleware para parsear o corpo da requisição
app.use(bodyParser.json());

// Configurar o pool de conexões com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Rota de registro de usuário
app.post('/register', async (req, res) => {
  const { name, email, password, cpf, rg, validade, orgaoExpeditor, telefone1, telefone2, dataNasc, numLote, dataCompra, dataPrevista, valorLote, valorEntrada, formaPagamento, valorParcelas } = req.body;

  try {
    // Verificar se o email já foi registrado
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Inserir os dados na tabela `users`
    const userResult = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    const userId = userResult.rows[0].id;

    // Inserir os dados na tabela `user_data`
    await pool.query(
      'INSERT INTO user_data (user_id, name, email, cpf, rg, validade, orgao_expeditor, telefone1, telefone2, data_nasc, num_lote, data_compra, data_prevista, valor_lote, valor_entrada, forma_pagamento, valor_parcelas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
      [userId, name, email, cpf, rg, validade, orgaoExpeditor, telefone1, telefone2, dataNasc, numLote, dataCompra, dataPrevista, valorLote, valorEntrada, formaPagamento, valorParcelas]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota de login com autenticação usando bcrypt e JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o email existe
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const user = result.rows[0];

    // Verificar a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id, type: user.type }, secretKey, { expiresIn: '1h' });

    // Enviar o token no cookie
    res.cookie('token', token, {
      httpOnly: true, // O cookie não pode ser acessado via JavaScript
      secure: process.env.NODE_ENV === 'production', // Enviar apenas via HTTPS em produção
      maxAge: 3600000, // 1 hora
    });

    res.json({ token });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota para verificar o token JWT e retornar o tipo de usuário
app.post('/verify-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Pega o token do header

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Verifica o token JWT
    res.json({ userId: decoded.userId, userType: decoded.type });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

// Rota para logout (remover o cookie com o token JWT)
app.post('/logout', (req, res) => {
  res.clearCookie('token'); // Limpa o cookie do token JWT
  res.json({ message: 'Logout bem-sucedido' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

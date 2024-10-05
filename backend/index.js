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
// Rota para registrar apenas o user_data
app.post('/register-user-data', async (req, res) => {
  const {
    name,
    email,
    cpf,
    rg,
    validade,
    orgaoExpeditor,
    telefone1,
    telefone2,
    dataNasc,
    numLote,
    dataCompra,
    dataPrevista,
    valorLote,
    valorEntrada,
    formaPagamento,
    valorParcelas,
  } = req.body;

  console.log('Recebendo dados do comprador:', {
    name,
    email,
    cpf,
    rg,
    validade,
    orgaoExpeditor,
    telefone1,
    telefone2,
    dataNasc,
    numLote,
    dataCompra,
    dataPrevista,
    valorLote,
    valorEntrada,
    formaPagamento,
    valorParcelas,
  });

  try {
    // Inserir os dados na tabela `user_data`
    await pool.query(
      'INSERT INTO user_data (name, email, cpf, rg, validade, orgao_expeditor, telefone1, telefone2, data_nasc, num_lote, data_compra, data_prevista, valor_lote, valor_entrada, forma_pagamento, valor_parcelas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)',
      [
        name || null,
        email || null,
        cpf || null,
        rg || null,
        validade || null,
        orgaoExpeditor || null,
        telefone1 || null,
        telefone2 || null,
        dataNasc || null,
        numLote || null,
        dataCompra || null,
        dataPrevista || null,
        valorLote || null,
        valorEntrada || null,
        formaPagamento || null,
        valorParcelas || null,
      ]
    );

    console.log('Dados inseridos na tabela `user_data` com sucesso');
    res.status(201).json({ message: 'Dados do comprador registrados com sucesso' });
  } catch (err) {
    console.error('Erro ao inserir dados no `user_data`:', err);
    res.status(500).json({ message: 'Erro no servidor ao registrar os dados do comprador' });
  }
});



// Rota de buscar clientes
app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, telefone1, num_lote FROM user_data');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).json({ message: 'Erro no servidor ao buscar clientes' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

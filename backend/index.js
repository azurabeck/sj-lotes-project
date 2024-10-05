/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS para permitir o frontend fazer requisições ao backend
app.use(cors({
  origin: ['http://localhost:3000', process.env.NEXT_PUBLIC_BACKEND_URL], // Permitir origens específicas
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware para parsear o corpo da requisição
app.use(bodyParser.json());

// Configurar o pool de conexões com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Rota de registro de `user_data`
app.post('/register', async (req, res) => {
  const { nome, email, cpf, rg, validade, orgaoExpedidor, telefones, dataNascimento } = req.body;

  console.log('Recebendo dados do comprador:', { nome, email, cpf, rg, validade, orgaoExpedidor, telefones, dataNascimento });

  try {
    // Verificar se o email já foi registrado no `user_data`
    const result = await pool.query('SELECT * FROM user_data WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Comprador já registrado' });
    }

    // Inserir novo comprador no banco de dados
    await pool.query(
      'INSERT INTO user_data (nome, email, cpf, rg, validade, orgao_expedidor, telefones, data_nascimento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [nome, email, cpf, rg, validade, orgaoExpedidor, telefones, dataNascimento]
    );

    res.status(201).json({ message: 'Comprador registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar comprador:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

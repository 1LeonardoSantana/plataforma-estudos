// Importa o Router do Express — cria as rotas separadas do servidor principal
const router = require('express').Router();

// Importa as funções do authController
const { cadastrar, login } = require('../controllers/authController');

// Rota POST /auth/cadastro — cria um novo usuário
// Exemplo: POST http://localhost:3000/auth/cadastro
router.post('/cadastro', cadastrar);

// Rota POST /auth/login — autentica um usuário existente
// Exemplo: POST http://localhost:3000/auth/login
router.post('/login', login);

// Exporta as rotas para usar no server.js
module.exports = router;
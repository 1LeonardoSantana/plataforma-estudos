// Importa o Router do Express
const router = require('express').Router();

// Importa o middleware de autenticação
const autenticar = require('../middlewares/authMiddleware');

// Importa as funções do controller
const { iniciar, finalizar, listar, resumo } = require('../controllers/sessoesController');

// GET /sessoes — lista todas as sessões do usuário
router.get('/', autenticar, listar);

// GET /sessoes/resumo — retorna total de minutos por disciplina
router.get('/resumo', autenticar, resumo);

// POST /sessoes — inicia uma nova sessão de estudo
router.post('/', autenticar, iniciar);

// PATCH /sessoes/:id/finalizar — finaliza uma sessão
router.patch('/:id/finalizar', autenticar, finalizar);

// Exporta as rotas
module.exports = router;

// Importa o Router do Express
const router = require('express').Router();

// Importa o middleware de autenticação
const autenticar = require('../middlewares/authMiddleware');

// Importa as funções do controller
const { listar, criar, atualizar, deletar } = require('../controllers/disciplinasController');

// Todas as rotas abaixo exigem que o usuário esteja logado (autenticar)

// GET /disciplinas — lista todas as disciplinas do usuário
router.get('/', autenticar, listar);

// POST /disciplinas — cria uma nova disciplina
router.post('/', autenticar, criar);

// PUT /disciplinas/:id — atualiza uma disciplina pelo id
router.put('/:id', autenticar, atualizar);

// DELETE /disciplinas/:id — remove uma disciplina pelo id
router.delete('/:id', autenticar, deletar);

// Exporta as rotas
module.exports = router;
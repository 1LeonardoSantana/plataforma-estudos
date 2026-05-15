// Importa o Router do Express
const router = require('express').Router();

// Importa o middleware de autenticação
const autenticar = require('../middlewares/authMiddleware');

// Importa as funções do controller
const { listar, criar, concluir, deletar } = require('../controllers/tarefasController');

// GET /tarefas — lista todas as tarefas do usuário
router.get('/', autenticar, listar);

// POST /tarefas — cria uma nova tarefa
router.post('/', autenticar, criar);

// PATCH /tarefas/:id/concluir — marca a tarefa como concluída
router.patch('/:id/concluir', autenticar, concluir);

// DELETE /tarefas/:id — remove uma tarefa
router.delete('/:id', autenticar, deletar);

// Exporta as rotas
module.exports = router;
// Importa o Router do Express
const router = require('express').Router();

// Importa o middleware de autenticação
const autenticar = require('../middlewares/authMiddleware');

// Importa as funções do controller
const { listar, criar, responder, deletar } = require('../controllers/flashcardsController');

// GET /flashcards — lista todos os flashcards do usuário
router.get('/', autenticar, listar);

// POST /flashcards — cria um novo flashcard
router.post('/', autenticar, criar);

// PATCH /flashcards/:id/responder — registra acerto ou erro
router.patch('/:id/responder', autenticar, responder);

// DELETE /flashcards/:id — remove um flashcard
router.delete('/:id', autenticar, deletar);

// Exporta as rotas
module.exports = router;
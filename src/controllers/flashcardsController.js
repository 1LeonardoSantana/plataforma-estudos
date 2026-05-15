// Importa a conexão com o banco
const pool = require('../config/database');

// LISTAR — retorna todos os flashcards do usuário
const listar = async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM flashcards WHERE usuario_id = $1 ORDER BY criado_em DESC',
      [req.usuario.id]
    );
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// CRIAR — cria um novo flashcard
const criar = async (req, res) => {
  try {
    const { pergunta, resposta, disciplina_id } = req.body;

    const resultado = await pool.query(
      'INSERT INTO flashcards (usuario_id, disciplina_id, pergunta, resposta) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.usuario.id, disciplina_id, pergunta, resposta]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// RESPONDER — registra se o usuário acertou ou errou
const responder = async (req, res) => {
  try {
    const { id } = req.params;
    const { acertou } = req.body;

    // Se acertou, incrementa acertos. Se errou, incrementa erros
    const campo = acertou ? 'acertos' : 'erros';

    const resultado = await pool.query(
      `UPDATE flashcards SET ${campo} = ${campo} + 1 WHERE id = $1 AND usuario_id = $2 RETURNING *`,
      [id, req.usuario.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Flashcard não encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// DELETAR — remove um flashcard
const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'DELETE FROM flashcards WHERE id = $1 AND usuario_id = $2 RETURNING *',
      [id, req.usuario.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Flashcard não encontrado' });
    }

    res.json({ mensagem: 'Flashcard removido com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// Exporta todas as funções
module.exports = { listar, criar, responder, deletar };
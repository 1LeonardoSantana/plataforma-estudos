// Importa a conexão com o banco
const pool = require('../config/database');

// LISTAR — retorna todas as tarefas do usuário logado
const listar = async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM tarefas WHERE usuario_id = $1 ORDER BY criado_em DESC',
      [req.usuario.id]
    );
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// CRIAR — cria uma nova tarefa
const criar = async (req, res) => {
  try {
    const { titulo, descricao, prazo, disciplina_id } = req.body;

    const resultado = await pool.query(
      'INSERT INTO tarefas (usuario_id, disciplina_id, titulo, descricao, prazo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.usuario.id, disciplina_id, titulo, descricao, prazo]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// CONCLUIR — marca uma tarefa como concluída
const concluir = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'UPDATE tarefas SET concluida = TRUE WHERE id = $1 AND usuario_id = $2 RETURNING *',
      [id, req.usuario.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// DELETAR — remove uma tarefa
const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'DELETE FROM tarefas WHERE id = $1 AND usuario_id = $2 RETURNING *',
      [id, req.usuario.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    res.json({ mensagem: 'Tarefa removida com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// Exporta todas as funções
module.exports = { listar, criar, concluir, deletar };
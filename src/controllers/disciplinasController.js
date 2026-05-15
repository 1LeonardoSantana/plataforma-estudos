// Importa a conexão com o banco
const pool = require('../config/database');

// LISTAR — retorna todas as disciplinas do usuário logado
const listar = async (req, res) => {
  try {
    // req.usuario.id vem do middleware — sabe quem está logado
    const resultado = await pool.query(
      'SELECT * FROM disciplinas WHERE usuario_id = $1 ORDER BY criado_em DESC',
      [req.usuario.id]
    );

    res.json(resultado.rows);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// CRIAR — cria uma nova disciplina
const criar = async (req, res) => {
  try {
    const { nome, descricao, cor } = req.body;

    const resultado = await pool.query(
      'INSERT INTO disciplinas (usuario_id, nome, descricao, cor) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.usuario.id, nome, descricao, cor]
    );

    res.status(201).json(resultado.rows[0]);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// ATUALIZAR — edita uma disciplina existente
const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, cor } = req.body;

    const resultado = await pool.query(
      'UPDATE disciplinas SET nome=$1, descricao=$2, cor=$3 WHERE id=$4 AND usuario_id=$5 RETURNING *',
      [nome, descricao, cor, id, req.usuario.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Disciplina não encontrada' });
    }

    res.json(resultado.rows[0]);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// DELETAR — remove uma disciplina
const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'DELETE FROM disciplinas WHERE id=$1 AND usuario_id=$2 RETURNING *',
      [id, req.usuario.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Disciplina não encontrada' });
    }

    res.json({ mensagem: 'Disciplina removida com sucesso!' });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// Exporta todas as funções
module.exports = { listar, criar, atualizar, deletar };
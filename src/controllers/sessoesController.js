// Importa a conexão com o banco
const pool = require('../config/database');

// INICIAR — começa uma sessão de estudo
const iniciar = async (req, res) => {
  try {
    const { disciplina_id } = req.body;

    // Registra o horário de início
    const resultado = await pool.query(
      'INSERT INTO sessoes_estudo (usuario_id, disciplina_id, inicio) VALUES ($1, $2, NOW()) RETURNING *',
      [req.usuario.id, disciplina_id]
    );

    res.status(201).json({
      mensagem: 'Sessão de estudo iniciada!',
      sessao: resultado.rows[0]
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// FINALIZAR — encerra a sessão e calcula os minutos estudados
const finalizar = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca a sessão para pegar o horário de início
    const sessao = await pool.query(
      'SELECT * FROM sessoes_estudo WHERE id = $1 AND usuario_id = $2',
      [id, req.usuario.id]
    );

    if (sessao.rows.length === 0) {
      return res.status(404).json({ erro: 'Sessão não encontrada' });
    }

    // Calcula os minutos estudados
    const resultado = await pool.query(
      `UPDATE sessoes_estudo 
       SET fim = NOW(), 
           minutos_estudados = EXTRACT(EPOCH FROM (NOW() - inicio)) / 60
       WHERE id = $1 AND usuario_id = $2 
       RETURNING *`,
      [id, req.usuario.id]
    );

    res.json({
      mensagem: 'Sessão finalizada!',
      sessao: resultado.rows[0]
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// LISTAR — retorna todas as sessões do usuário
const listar = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT s.*, d.nome as disciplina_nome 
       FROM sessoes_estudo s
       LEFT JOIN disciplinas d ON s.disciplina_id = d.id
       WHERE s.usuario_id = $1 
       ORDER BY s.criado_em DESC`,
      [req.usuario.id]
    );

    res.json(resultado.rows);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// RESUMO — retorna total de minutos estudados por disciplina
const resumo = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT d.nome, SUM(s.minutos_estudados) as total_minutos
       FROM sessoes_estudo s
       LEFT JOIN disciplinas d ON s.disciplina_id = d.id
       WHERE s.usuario_id = $1
       GROUP BY d.nome
       ORDER BY total_minutos DESC`,
      [req.usuario.id]
    );

    res.json(resultado.rows);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// Exporta todas as funções
module.exports = { iniciar, finalizar, listar, resumo };
// Importa o bcrypt para criptografar senhas
const bcrypt = require('bcryptjs');

// Importa o JWT para gerar tokens de autenticação
const jwt = require('jsonwebtoken');

// Importa a conexão com o banco de dados
const pool = require('../config/database');

// CADASTRO — cria um novo usuário
const cadastrar = async (req, res) => {
  try {
    // Pega os dados enviados pelo usuário
    const { nome, email, senha } = req.body;

    // Verifica se o email já está cadastrado
    const usuarioExiste = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );

    if (usuarioExiste.rows.length > 0) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    // Criptografa a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // Salva o usuário no banco
    const resultado = await pool.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senhaHash]
    );

    // Retorna o usuário criado
    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: resultado.rows[0]
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// LOGIN — autentica um usuário existente
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o usuário pelo email
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    const usuario = resultado.rows[0];

    // Compara a senha digitada com a senha criptografada
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    // Gera o token JWT válido por 7 dias
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// Exporta as funções para usar nas rotas
module.exports = { cadastrar, login };
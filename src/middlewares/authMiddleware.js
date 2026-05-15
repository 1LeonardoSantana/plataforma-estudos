// Importa o JWT para verificar o token
const jwt = require('jsonwebtoken');

// Middleware de autenticação — verifica se o usuário está logado
const autenticar = (req, res, next) => {

  // Pega o token do cabeçalho da requisição
  // O token vem no formato: "Bearer eyJhbGc..."
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Se não tiver token, nega o acesso
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  // Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (erro, usuario) => {
    if (erro) {
      return res.status(403).json({ erro: 'Token inválido ou expirado' });
    }

    // Se válido, salva os dados do usuário na requisição
    // Assim as próximas funções sabem quem está logado
    req.usuario = usuario;

    // Passa para a próxima função da rota
    next();
  });
};

// Exporta o middleware para usar nas rotas
module.exports = autenticar;

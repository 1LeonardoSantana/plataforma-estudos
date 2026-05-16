import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/global.css';

export default function Login() {
  // Estados para guardar o que o usuário digita
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Função chamada quando o usuário clica em Entrar
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      // Faz a requisição para a API
      const resposta = await api.post('/auth/login', { email, senha });

      // Salva o token e os dados do usuário no localStorage
      localStorage.setItem('token', resposta.data.token);
      localStorage.setItem('usuario', JSON.stringify(resposta.data.usuario));

      // Redireciona para o dashboard
      navigate('/dashboard');

    } catch (err) {
      setErro('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '0 20px',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>
            Study<span style={{ color: '#e24b4a' }}>Quest</span>
          </h1>
          <p style={{ color: '#555', fontSize: '13px', marginTop: '6px' }}>
            sua jornada de estudos começa aqui
          </p>
        </div>

        {/* Card do formulário */}
        <div style={{
          background: '#161616',
          border: '1px solid #242424',
          borderRadius: '16px',
          padding: '32px',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#fff', marginBottom: '24px' }}>
            Entrar na conta
          </h2>

          {/* Mensagem de erro */}
          {erro && (
            <div style={{
              background: 'rgba(226,75,74,0.1)',
              border: '1px solid rgba(226,75,74,0.3)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#e24b4a',
              fontSize: '13px',
              marginBottom: '16px',
            }}>
              {erro}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Campo email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            {/* Campo senha */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Botão entrar */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Link para cadastro */}
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#555' }}>
            Não tem conta?{' '}
            <Link to="/cadastro" style={{ color: '#e24b4a', textDecoration: 'none' }}>
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
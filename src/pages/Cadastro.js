import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/global.css';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      await api.post('/auth/cadastro', { nome, email, senha });
      // Após cadastrar, vai para o login
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao criar conta');
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
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 20px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff' }}>
            Study<span style={{ color: '#e24b4a' }}>Quest</span>
          </h1>
          <p style={{ color: '#555', fontSize: '13px', marginTop: '6px' }}>
            crie sua conta e comece sua jornada
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
            Criar conta
          </h2>

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

          <form onSubmit={handleCadastro}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>

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

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="mínimo 6 caracteres"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#555' }}>
            Já tem conta?{' '}
            <Link to="/login" style={{ color: '#e24b4a', textDecoration: 'none' }}>
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
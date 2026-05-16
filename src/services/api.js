// Importa o axios — biblioteca para fazer requisições HTTP
import axios from 'axios';

// Cria uma instância do axios já configurada com a URL base da API
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor — antes de toda requisição, adiciona o token automaticamente
api.interceptors.request.use((config) => {
  // Pega o token salvo no localStorage
  const token = localStorage.getItem('token');

  // Se tiver token, coloca no cabeçalho Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Exporta a instância configurada
export default api;

// Importa o Express - framework que cria o servidor web
const express = require ('express');
//Importa o CORS - permite que o frontend acesse a API
const cors = require('cors');

//Carrega as variáveis do arquivo .env (PORT, DB_NAME,etc)
require('dotenv').config();

//Importa a conexão com o banco de dados 
const pool = require('./config/database');
// Importa as rotas de autenticação
const authRoutes = require('./routes/authRoutes');
// Importa as rotas de disciplinas
const disciplinasRoutes = require('./routes/disciplinasRoutes');
// Importa as rotas de tarefas
const tarefasRoutes = require('./routes/tarefasRoutes');
// Importa as rotas de flashcards
const flashcardsRoutes = require('./routes/flashcardsRoutes');
//Cria a aplicação Express 
const app = express();

//Ativa o CORS para aceitar requisições do frontend
app.use(cors());

//Permite que a API entenda JSON no corpo das requisições 
app.use(express.json());
// Registra as rotas de autenticação no caminho /auth
app.use('/auth', authRoutes);
// Registra as rotas de disciplinas no caminho /disciplinas
app.use('/disciplinas', disciplinasRoutes);
// Registra as rotas de tarefas no caminho /tarefas
app.use('/tarefas', tarefasRoutes);
// Registra as rotas de flashcards no caminho /flashcards
app.use('/flashcards', flashcardsRoutes);

//Rota de teste - quando alguém acessar "/", retorna uma mensagem 
app.get('/',(req,res) => {
    res.json ({mensagem :'API Plataforma de Estudos funcionando !'})
}
) ;
//Pega a prota de .env (3000) ou usa 3000 como padrão 
const PORT = process.env.PORT||3000;
//Inicia o servidor n e mostra no terminal quando estiver pronto 
app.listen (PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
});
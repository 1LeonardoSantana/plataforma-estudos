//Importa  o Pool do pq - gerencia conexões com o PostgreSQL
const{Pool} = require('pg');


//Cria o pool de conexões  usando as variáveis do .env
const pool = new Pool({
   host : process.env.DB_HOST,
   port : process.env.DB_PORT,
   database : process.env.DB_NAME,
   user : process.env.DB_USER,
   password : process.env.DB_PASSWORD,

})
//Testa a conexão  quando  o arquivo for carregado
pool.connect((err,client,release) => {
  if(err){
    console.error('Erro ao conectar ao banco de dados:err.message');
  }else{
    console.log("Conectando  ao PostgreSQL com sucesso!")
    release();

  }


});
module.exports = pool;
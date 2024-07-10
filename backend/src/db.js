const mysql = require('mysql');

// Função para criar uma nova conexão
const createConnection = () => {
  return mysql.createConnection({
    host: '179.188.16.117',
    user: 'wgfrontcr',
    password: 'WgtecFront@129',
    database: 'wgfrontcr',
    keepAlive: true,
  });
};

// Função para executar consultas
const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    
    connection.connect((err) => {
      if (err) {
        reject(new Error('Erro ao conectar ao banco de dados: ' + err.message));
        return;
      }

      connection.query(query, params, (error, results, fields) => {
        console.log(connection)
        console.log(params)
        console.log(query)
        console.log(results)
        console.log(error)
        connection.end(); // Encerra a conexão após a consulta

        if (error) {
          reject(new Error('Erro ao executar a consulta: ' + error.message));
          return;
        }

        resolve(results);
      });
    });
  });
};

// Teste de conexão inicial
const testConnection = () => {
  const connection = createConnection();
  
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      return;
    }
    console.log('Conexão ao banco de dados estabelecida com sucesso.');
    connection.end();
  });
};

// Executar teste de conexão ao iniciar o módulo
testConnection();

module.exports = {
  executeQuery
};

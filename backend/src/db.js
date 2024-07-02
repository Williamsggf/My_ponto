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
    
    connection.query(query, params, (error, results, fields) => {
      connection.end(); // Encerra a conexão após a consulta

      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });
};

module.exports = {
  executeQuery
};

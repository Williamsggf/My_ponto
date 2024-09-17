const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Ajuste conforme o seu arquivo de rotas
require('dotenv').config();

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/', routes); // Ajuste o caminho conforme necessário

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

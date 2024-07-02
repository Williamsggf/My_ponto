const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Ajuste conforme o seu arquivo de rotas
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes); // Ajuste o caminho conforme necessário

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


const express = require('express');
const router = express.Router();
const db = require('./db');
const md5 = require('md5');

router.post('/login', async (req, res) => {
    const { cpf, password } = req.body;

    // Verificação se os campos estão presentes
    if (!cpf || !password) {
        return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
    }

    // Consulta SQL para verificar as credenciais
    const query = `SELECT id, cpf, senha FROM usuarios WHERE cpf = ? AND senha = ?`;
    try {
        const results = await db.executeQuery(query, [cpf, password]); 
        if (results.length > 0) {

            const user=results[0];

            return res.json({ 
                message: 'Login realizado com sucesso',
                id: user.id,
                message: 'id'
             });
            
        } else {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar usuário.' });
    }
});

router.post('/recurses', async (req, res) => {
    const userId = req.body;

    // Consulta SQL para verificar as permissões
    const query = `SELECT id, cpf, senha FROM usuarios WHERE cpf = ? AND senha = ?`;
    try {
        const results = await db.executeQuery(query, [cpf, password]); 
        if (results.length > 0) {

            const user=results[0];

            return res.json({ 
                message: 'Login realizado com sucesso',
                id: user.id,
                message: 'id'
             });
            
        } else {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar usuário.' });
    }
});


module.exports = router;

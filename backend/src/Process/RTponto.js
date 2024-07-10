const express = require('express');
const router = express.Router();
const db = require('../db');

// Função auxiliar para responder com erro
const responderComErro = (res, status, mensagem) => {
    return res.status(status).json({ error: mensagem });
};

// Endpoint para registrar ou consultar ponto
router.post('/CTPonto', async (req, res) => {
    const { userId, data } = req.body;

    if (!userId || !data) {
        return responderComErro(res, 400, 'Usuário e data são obrigatórios');
    }

    // Consulta para verificar se já existe registro de ponto para o usuário na data
    const ptQuery = 'SELECT id, dt_ponto, tp_reg, forma, hora FROM registro_ponto WHERE usuario = ? AND dt_ponto = ?';

    try {
        const ptResults = await db.executeQuery(ptQuery, [userId, data]);

        if (ptResults.length > 0) {
            // Já existe registro de ponto, retornar os registros existentes
            return res.json({
                message: 'Pontos encontrados',
                registros: ptResults
            });
        } else {
            // Não há registro de ponto
            return res.json({
                message: 'Nenhum ponto encontrado para a data especificada'
            });
        }
    } catch (error) {
        console.error('Erro ao consultar ponto:', error);
        return responderComErro(res, 500, 'Erro interno ao consultar ponto.');
    }
});

router.post('/RGPonto', async (req, res) => {
    const { userId, data, tp_reg, forma, hora } = req.body;

    if (!userId || !data) {
        return responderComErro(res, 400, 'Usuário e data são obrigatórios');
    }

    // Inserir um novo registro de ponto
    const insertQuery = `
        INSERT INTO registro_ponto (usuario, dt_ponto, tp_reg, forma, hora )
        VALUES (?, ?, ?, ?, ?)
    `;

    const insertValues = [userId, data, tp_reg, forma, hora];

    try {
        await db.executeQuery(insertQuery, insertValues)
            .then(r => console.log(r));

        return res.json({
            message: 'Ponto registrado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao registrar ponto:', error);
        return responderComErro(res, 500, 'Erro interno ao registrar ponto.');
    }
});


module.exports = router;
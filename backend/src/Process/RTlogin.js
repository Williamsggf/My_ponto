const express = require('express');
const router = express.Router();
const db = require('../db');

// Função auxiliar para responder com erro
const responderComErro = (res, status, mensagem) => {
    return res.status(status).json({ error: mensagem });
};

// Endpoint de login
router.post('/login', async (req, res) => {
    const { cpf, password } = req.body;
    if (!cpf || !password) {
        return responderComErro(res, 400, 'CPF e senha são obrigatórios.');
    }

    const loginQuery = 'SELECT id, nome, cpf, pf_usuario as perfil FROM usuarios WHERE cpf = ? AND senha = ?';
    try {
        const loginResults = await db.executeQuery(loginQuery, [cpf, password]);
        if (loginResults.length > 0) {
            const user = loginResults[0];
            const perfilQuery = 'SELECT regst_pt, cadastro_usuario, relatorio, indicadores FROM perfil_usuario WHERE id = ?';
            const perfilResults = await db.executeQuery(perfilQuery, [user.perfil]);

            if (perfilResults.length > 0) {
                const perfil = perfilResults[0];
                return res.json({
                    message: 'Login realizado com sucesso',
                    id: user.id,
                    nome: user.nome,
                    perfil: user.perfil,
                    ponto: perfil.regst_pt,
                    cadastro: perfil.cadastro_usuario,
                    relatorio: perfil.relatorio,
                    indicadores: perfil.indicadores,
                });
            } else {
                return responderComErro(res, 404, 'Perfil não encontrado.');
            }
        } else {
            return responderComErro(res, 401, 'Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return responderComErro(res, 500, 'Erro interno ao buscar usuário.');
    }
});

module.exports = router;

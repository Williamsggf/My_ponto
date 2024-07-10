const express = require('express');
const router = express.Router();
const db = require('./db');

// Importar o arquivo de login
const login = require('./Process/RTlogin');
router.use('/auth', login);

const CTPonto = require('./Process/RTponto');
router.use('/auth', CTPonto);

const RGPonto = require('./Process/RTponto');
router.use('/auth', RGPonto);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getConfiguracoes, atualizarConfiguracao, cadastrarUsuario } = require('./configuracoesControlador');

router.get('/', getConfiguracoes);
router.post('/users', cadastrarUsuario);
router.put('/:key', atualizarConfiguracao);

module.exports = router;

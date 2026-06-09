const express = require('express');
const router = express.Router();
const { getConfiguracoes, atualizarConfiguracao } = require('./configuracoesControlador');

router.get('/', getConfiguracoes);
router.put('/:key', atualizarConfiguracao);

module.exports = router;

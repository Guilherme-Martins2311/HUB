const express = require('express');
const router = express.Router();
const { listarRelatorios, criarRelatorio } = require('./controllers/relatorioControlador');

router.get('/', listarRelatorios);
router.post('/', criarRelatorio);

module.exports = router;
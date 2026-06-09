const express = require('express');
const router = express.Router();
const { listarEmpresas, buscarEmpresa, criarEmpresa,
    atualizarEmpresa, deletarEmpresa, buscarPerfilEmpresa } = require('./controllers/empresaControlador');

router.get('/', listarEmpresas);
router.get('/:id', buscarEmpresa);
router.get('/:id/profile', buscarPerfilEmpresa);
router.post('/', criarEmpresa);
router.put('/:id', atualizarEmpresa);
router.delete('/:id', deletarEmpresa);

module.exports = router;
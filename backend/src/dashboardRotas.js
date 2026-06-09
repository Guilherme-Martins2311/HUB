const express = require('express');
const router = express.Router();
const { listarDashboard } = require('./controllers/dashboardControlador');

router.get('/', listarDashboard);

module.exports = router;
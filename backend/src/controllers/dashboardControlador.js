const { getDashboardPayload } = require('../data/hubData');

const listarDashboard = async (req, res) => {
  try {
    res.json(getDashboardPayload(req.query));
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar dashboard', detalhe: err.message });
  }
};

module.exports = { listarDashboard };
const { getDashboardPayload } = require('../data/dbHubData');

const listarDashboard = async (req, res) => {
  try {
    res.json(await getDashboardPayload(req.query));
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar dashboard', detalhe: err.message });
  }
};

module.exports = { listarDashboard };

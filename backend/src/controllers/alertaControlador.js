const { getAlertsPayload, getRecommendationsPayload } = require('../data/dbHubData');

const listarAlertas = async (req, res) => {
  try {
    res.json(await getAlertsPayload());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar alertas', detalhe: err.message });
  }
};

const listarRecomendacoes = async (req, res) => {
  try {
    res.json(await getRecommendationsPayload());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar recomendações', detalhe: err.message });
  }
};

module.exports = { listarAlertas, listarRecomendacoes };

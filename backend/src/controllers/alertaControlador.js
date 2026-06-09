const { getAlertsPayload, getRecommendationsPayload } = require('../data/hubData');

const listarAlertas = async (req, res) => {
  try {
    res.json(getAlertsPayload());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar alertas', detalhe: err.message });
  }
};

const listarRecomendacoes = async (req, res) => {
  try {
    res.json(getRecommendationsPayload());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar recomendações', detalhe: err.message });
  }
};

module.exports = { listarAlertas, listarRecomendacoes };
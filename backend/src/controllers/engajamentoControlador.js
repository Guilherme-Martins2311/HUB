const { getEngagementPayload, getCompanyById, getCompanySummary } = require('../data/hubData');

const listarEngajamento = async (req, res) => {
  try {
    res.json(getEngagementPayload());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar engajamento', detalhe: err.message });
  }
};

const recalcularEngajamento = async (req, res) => {
  try {
    const company = getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ erro: 'Empresa não encontrada' });

    res.json({
      mensagem: 'Engajamento recalculado com sucesso',
      company: getCompanySummary(company),
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao recalcular', detalhe: err.message });
  }
};

module.exports = { listarEngajamento, recalcularEngajamento };
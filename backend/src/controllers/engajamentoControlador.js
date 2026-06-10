const { getEngagementPayload, getCompanyProfile } = require('../data/dbHubData');

const listarEngajamento = async (req, res) => {
  try {
    res.json(await getEngagementPayload());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar engajamento', detalhe: err.message });
  }
};

const recalcularEngajamento = async (req, res) => {
  try {
    const company = await getCompanyProfile(req.params.id);
    if (!company) return res.status(404).json({ erro: 'Empresa nao encontrada' });

    res.json({
      mensagem: 'Engajamento recalculado com sucesso',
      company,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao recalcular', detalhe: err.message });
  }
};

module.exports = { listarEngajamento, recalcularEngajamento };

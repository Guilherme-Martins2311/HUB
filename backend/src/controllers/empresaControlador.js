const {
  getCompanyById,
  getCompanySummaries,
  getCompanySummary,
  getRecentParticipationHistory,
  getEngagementHistory,
  getInsightCards,
  createCompany,
  upsertCompany,
  deleteCompany,
} = require('../data/hubData');

const listarEmpresas = async (req, res) => {
  try {
    res.json(getCompanySummaries());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar empresas', detalhe: err.message });
  }
};

const buscarEmpresa = async (req, res) => {
  try {
    const company = getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ erro: 'Empresa não encontrada' });
    res.json(getCompanySummary(company));
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar empresa', detalhe: err.message });
  }
};

const buscarPerfilEmpresa = async (req, res) => {
  try {
    const company = getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ erro: 'Empresa não encontrada' });

    const summary = getCompanySummary(company);
    res.json({
      ...summary,
      engagementHistory: getEngagementHistory(company.id),
      participationHistory: getRecentParticipationHistory(company.id),
      insights: getInsightCards(company),
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar perfil da empresa', detalhe: err.message });
  }
};

const criarEmpresa = async (req, res) => {
  try {
    const company = createCompany(req.body);
    res.status(201).json(getCompanySummary(company));
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar empresa', detalhe: err.message });
  }
};

const atualizarEmpresa = async (req, res) => {
  try {
    const company = upsertCompany(req.params.id, req.body);
    if (!company) return res.status(404).json({ erro: 'Empresa não encontrada' });
    res.json(getCompanySummary(company));
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar empresa', detalhe: err.message });
  }
};

const deletarEmpresa = async (req, res) => {
  try {
    const removed = deleteCompany(req.params.id);
    if (!removed) return res.status(404).json({ erro: 'Empresa não encontrada' });
    res.json({ mensagem: 'Empresa removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar empresa', detalhe: err.message });
  }
};

module.exports = { listarEmpresas, buscarEmpresa, buscarPerfilEmpresa, criarEmpresa, atualizarEmpresa, deletarEmpresa };
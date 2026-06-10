const {
  getCompanyById,
  getCompanySummaries,
  getCompanyProfile,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../data/dbHubData');

const listarEmpresas = async (req, res) => {
  try {
    res.json(await getCompanySummaries());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar empresas', detalhe: err.message });
  }
};

const buscarEmpresa = async (req, res) => {
  try {
    const company = await getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ erro: 'Empresa nao encontrada' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar empresa', detalhe: err.message });
  }
};

const buscarPerfilEmpresa = async (req, res) => {
  try {
    const company = await getCompanyProfile(req.params.id);
    if (!company) return res.status(404).json({ erro: 'Empresa nao encontrada' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar perfil da empresa', detalhe: err.message });
  }
};

const criarEmpresa = async (req, res) => {
  try {
    const company = await createCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar empresa', detalhe: err.message });
  }
};

const atualizarEmpresa = async (req, res) => {
  try {
    const company = await updateCompany(req.params.id, req.body);
    if (!company) return res.status(404).json({ erro: 'Empresa nao encontrada' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar empresa', detalhe: err.message });
  }
};

const deletarEmpresa = async (req, res) => {
  try {
    const removed = await deleteCompany(req.params.id);
    if (!removed) return res.status(404).json({ erro: 'Empresa nao encontrada' });
    res.json({ mensagem: 'Empresa removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar empresa', detalhe: err.message });
  }
};

module.exports = { listarEmpresas, buscarEmpresa, buscarPerfilEmpresa, criarEmpresa, atualizarEmpresa, deletarEmpresa };

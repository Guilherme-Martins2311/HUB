// TODO: conectar ao banco de dados

function getEmpresas(req, res) {
  // TODO: buscar todas as empresas no banco
  res.json([]);
}

function getEmpresaPorId(req, res) {
  const id = Number(req.params.id);
  // TODO: buscar empresa pelo id no banco
  res.status(404).json({ message: 'Empresa não encontrada' });
}

function criarEmpresa(req, res) {
  const { name, sector, status, employees, engagement, city, contactEmail } = req.body;

  if (!name || !sector || !status) {
    return res.status(400).json({
      message: 'Nome, setor e status são obrigatórios'
    });
  }

  // TODO: inserir nova empresa no banco
  res.status(201).json({ message: 'Empresa criada com sucesso' });
}

function atualizarEmpresa(req, res) {
  const id = Number(req.params.id);
  // TODO: atualizar empresa pelo id no banco
  res.json({ message: 'Empresa atualizada com sucesso' });
}

function deletarEmpresa(req, res) {
  const id = Number(req.params.id);
  // TODO: deletar empresa pelo id no banco
  res.json({ message: 'Empresa deletada com sucesso' });
}

module.exports = {
  getEmpresas,
  getEmpresaPorId,
  criarEmpresa,
  atualizarEmpresa,
  deletarEmpresa
};

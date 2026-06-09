const { getReportsPayload } = require('../data/hubData');

const listarRelatorios = async (req, res) => {
  try {
    res.json(getReportsPayload());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar relatórios', detalhe: err.message });
  }
};

const criarRelatorio = async (req, res) => {
  res.json({ mensagem: 'Relatório registrado com sucesso' });
};

module.exports = { listarRelatorios, criarRelatorio };
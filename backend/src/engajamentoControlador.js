// TODO: conectar ao banco de dados

function getDashboard(req, res) {
  // TODO: buscar métricas do banco e calcular os totais
  res.json({
    totalEmpresas: 0,
    empresasAtivas: 0,
    empresasPendentes: 0,
    empresasInativas: 0,
    engajamentoMedio: 0,
    totalFuncionarios: 0
  });
}

module.exports = { getDashboard };

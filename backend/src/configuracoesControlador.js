const { getSettingsPayload, createUser, updateSetting } = require('./data/dbHubData');

async function getConfiguracoes(req, res) {
  try {
    res.json(await getSettingsPayload());
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar configuracoes', detalhe: err.message });
  }
}

async function atualizarConfiguracao(req, res) {
  const { key } = req.params;
  const { value } = req.body;
  if (value === undefined) {
    return res.status(400).json({ message: 'Valor e obrigatorio' });
  }

  try {
    await updateSetting(key, value);
    res.json({ message: `Configuracao '${key}' atualizada com sucesso`, value });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar configuracao', detalhe: err.message });
  }
}

async function cadastrarUsuario(req, res) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    const status = err.message.includes('obrigatorios') ? 400 : 500;
    res.status(status).json({ erro: 'Erro ao cadastrar usuario', detalhe: err.message });
  }
}

module.exports = { getConfiguracoes, atualizarConfiguracao, cadastrarUsuario };

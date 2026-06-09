const { getSettingsPayload } = require('./data/hubData');

let settingsState = getSettingsPayload();

async function getConfiguracoes(req, res) {
  res.json(settingsState);
}

async function atualizarConfiguracao(req, res) {
  const { key } = req.params;
  const { value } = req.body;
  if (value === undefined) {
    return res.status(400).json({ message: 'Valor é obrigatório' });
  }

  settingsState = {
    ...settingsState,
    [key]: value,
  };

  res.json({ message: `Configuração '${key}' atualizada com sucesso`, value });
}

module.exports = { getConfiguracoes, atualizarConfiguracao };

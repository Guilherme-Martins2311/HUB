require('dotenv').config();
const express = require('express');
const cors = require('cors');

const empresaRotas = require('./empresaRotas');
const relatorioRotas = require('./relatorioRotas');
const configuracoesRotas = require('./configuracoesRotas');
const dashboardRotas = require('./dashboardRotas');
const { listarEngajamento, recalcularEngajamento } = require('./controllers/engajamentoControlador');
const { listarAlertas, listarRecomendacoes } = require('./controllers/alertaControlador');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API do HUB Fibra funcionando!', version: '1.0.0' }));
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.use('/api/companies', empresaRotas);
app.use('/api/dashboard', dashboardRotas);
app.use('/api/reports', relatorioRotas);
app.use('/api/settings', configuracoesRotas);
app.get('/api/engagement', listarEngajamento);
app.post('/api/engagement/recalcular/:id', recalcularEngajamento);
app.get('/api/alerts', listarAlertas);
app.get('/api/recommendations', listarRecomendacoes);

app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

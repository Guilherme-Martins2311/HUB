const currentDate = new Date('2026-06-01T00:00:00');

const companies = [
  {
    id: 1,
    name: 'TechForja',
    legalName: 'TechForja Solucoes Industriais LTDA',
    cnpj: '12.345.678/0001-90',
    cep: '70000-000',
    cnae: '2512-0/00',
    address: 'Setor Industrial Norte, Quadra 3, Lote 15',
    region: 'Plano Piloto',
    contact: 'Carlos Mendes',
    manager: 'Carlos Mendes',
    phone: '(61) 99999-0001',
    email: 'carlos@techforja.com.br',
    sector: 'Metalurgia',
    size: 'Pequena empresa',
    companyType: 'Industria',
    employees: 45,
    ledByWoman: false,
    unionMember: true,
    maturity: 'Intermediario',
    registeredAt: '2026-01-10',
  },
  {
    id: 2,
    name: 'InovaBrasilia',
    legalName: 'InovaBrasilia Tecnologia e Inovacao LTDA',
    cnpj: '23.456.789/0001-01',
    cep: '71000-000',
    cnae: '6201-5/00',
    address: 'SIG Quadra 8, Lote 2345',
    region: 'Guara',
    contact: 'Ana Souza',
    manager: 'Ana Souza',
    phone: '(61) 99999-0002',
    email: 'ana@inovadf.com.br',
    sector: 'Tecnologia da Informacao',
    size: 'Microempresa',
    companyType: 'Startup',
    employees: 12,
    ledByWoman: true,
    unionMember: false,
    maturity: 'Inicial',
    registeredAt: '2026-01-10',
  },
  {
    id: 3,
    name: 'AgroDF',
    legalName: 'AgroDF Processamento Agroindustrial SA',
    cnpj: '34.567.890/0001-12',
    cep: '73000-000',
    cnae: '1011-2/01',
    address: 'Nucleo Rural Vargem Bonita, Chacara 10',
    region: 'Nucleo Bandeirante',
    contact: 'Roberto Alves',
    manager: 'Roberto Alves',
    phone: '(61) 99999-0003',
    email: 'roberto@agrodf.com.br',
    sector: 'Agroindustria',
    size: 'Media empresa',
    companyType: 'Industria',
    employees: 120,
    ledByWoman: false,
    unionMember: true,
    maturity: 'Avancado',
    registeredAt: '2026-01-10',
  },
  {
    id: 4,
    name: 'ConstrutDF',
    legalName: 'ConstrutDF Engenharia e Construcao LTDA',
    cnpj: '45.678.901/0001-23',
    cep: '72000-000',
    cnae: '4120-4/00',
    address: 'SIA Trecho 3, Lote 625',
    region: 'Taguatinga',
    contact: 'Fernanda Lima',
    manager: 'Fernanda Lima',
    phone: '(61) 99999-0004',
    email: 'fernanda@construtdf.com.br',
    sector: 'Construcao Civil',
    size: 'Grande empresa',
    companyType: 'Industria',
    employees: 350,
    ledByWoman: true,
    unionMember: true,
    maturity: 'Intermediario',
    registeredAt: '2026-01-10',
  },
  {
    id: 5,
    name: 'EcoTextil',
    legalName: 'EcoTextil Confeccoes Sustentaveis LTDA',
    cnpj: '56.789.012/0001-34',
    cep: '71500-000',
    cnae: '1412-6/01',
    address: 'Setor de Industrias Bernardo Sayao, Lote 14',
    region: 'Ceilandia',
    contact: 'Marcos Oliveira',
    manager: 'Marcos Oliveira',
    phone: '(61) 99999-0005',
    email: 'marcos@ecotextil.com.br',
    sector: 'Textil',
    size: 'Pequena empresa',
    companyType: 'Industria',
    employees: 60,
    ledByWoman: false,
    unionMember: false,
    maturity: 'Inicial',
    registeredAt: '2026-01-10',
  },
];

const events = [
  { id: 1, name: 'Capacitacao em Gestao de Inovacao', pillar: 'Pilar I', type: 'Capacitacao', startDate: '2026-02-10', sector: 'Todos', businessGenerated: 0 },
  { id: 2, name: 'Visita Tecnica - Parque Tecnologico', pillar: 'Pilar I', type: 'Visita Tecnica', startDate: '2026-03-05', sector: 'Tecnologia', businessGenerated: 0 },
  { id: 3, name: 'Programa Inova+', pillar: 'Pilar II', type: 'Programa de Aceleracao', startDate: '2026-01-15', sector: 'Todos', businessGenerated: 8 },
  { id: 4, name: 'Encontro de Networking Abril', pillar: 'Pilar III', type: 'Encontro de Networking', startDate: '2026-04-18', sector: 'Todos', businessGenerated: 12 },
  { id: 5, name: 'Missao Internacional Sao Paulo', pillar: 'Pilar III', type: 'Missao', startDate: '2026-03-20', sector: 'Industria', businessGenerated: 5 },
  { id: 6, name: 'Capacitacao em ESG', pillar: 'Pilar I', type: 'Capacitacao', startDate: '2026-04-05', sector: 'Todos', businessGenerated: 0 },
  { id: 7, name: 'Ecossistema de Inovacao Aberta', pillar: 'Pilar III', type: 'Inovacao Aberta', startDate: '2026-05-02', sector: 'Tecnologia', businessGenerated: 9 },
];

const participations = [
  { companyId: 1, eventId: 1, date: '2026-02-10', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 1, eventId: 2, date: '2026-03-05', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 1, eventId: 3, date: '2026-01-15', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 1, eventId: 4, date: '2026-04-18', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 1, eventId: 6, date: '2026-04-05', confirmed: true, level: 'Media', frequencyControl: 1 },
  { companyId: 2, eventId: 1, date: '2026-02-10', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 2, eventId: 3, date: '2026-01-15', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 2, eventId: 4, date: '2026-04-18', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 2, eventId: 5, date: '2026-03-20', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 2, eventId: 7, date: '2026-05-02', confirmed: true, level: 'Alta', frequencyControl: 1 },
  { companyId: 3, eventId: 1, date: '2026-02-10', confirmed: true, level: 'Baixa', frequencyControl: 1 },
  { companyId: 3, eventId: 4, date: '2026-04-18', confirmed: false, level: 'Baixa', frequencyControl: 0 },
  { companyId: 4, eventId: 1, date: '2026-02-10', confirmed: false, level: 'Baixa', frequencyControl: 0 },
  { companyId: 5, eventId: 1, date: '2026-02-10', confirmed: true, level: 'Media', frequencyControl: 1 },
  { companyId: 5, eventId: 4, date: '2026-04-18', confirmed: true, level: 'Media', frequencyControl: 1 },
  { companyId: 5, eventId: 6, date: '2026-04-05', confirmed: true, level: 'Media', frequencyControl: 1 },
];

const scoreByLevel = {
  Alta: 18,
  Media: 12,
  Baixa: 8,
};

function toDate(value) {
  return new Date(`${value}T00:00:00`);
}

function buildDateRange(period) {
  if (period !== '30d') {
    return null;
  }

  const start = new Date(currentDate);
  start.setDate(start.getDate() - 30);

  return { start, end: currentDate };
}

function normalizeText(value) {
  return String(value || '').trim();
}

function getConfirmedParticipations(companyId) {
  return participations.filter(
    (participation) => participation.companyId === Number(companyId) && participation.confirmed && participation.frequencyControl === 1,
  );
}

function getLastInteractionDate(companyId) {
  const dates = getConfirmedParticipations(companyId)
    .map((participation) => new Date(`${participation.date}T00:00:00`).getTime())
    .sort((a, b) => b - a);

  return dates[0] ? new Date(dates[0]) : null;
}

function getDaysSinceLastInteraction(companyId) {
  const lastInteraction = getLastInteractionDate(companyId);
  if (!lastInteraction) {
    return null;
  }

  return Math.floor((currentDate.getTime() - lastInteraction.getTime()) / 86400000);
}

function calculateEngagementScore(companyId) {
  const confirmed = getConfirmedParticipations(companyId);
  const baseScore = confirmed.reduce(
    (total, participation) => total + scoreByLevel[participation.level],
    0,
  );
  const pillarBonus = new Set(
    confirmed.map(
      (participation) => events.find((event) => event.id === participation.eventId)?.pillar,
    ),
  ).size * 4;
  const daysWithoutInteraction = getDaysSinceLastInteraction(companyId);
  const inactivityPenalty = daysWithoutInteraction === null ? 25 : daysWithoutInteraction > 90 ? 35 : daysWithoutInteraction > 60 ? 20 : daysWithoutInteraction > 30 ? 10 : 0;

  return Math.max(0, Math.min(100, baseScore + pillarBonus - inactivityPenalty));
}

function getCategory(score) {
  if (score >= 90) return 'Diamante';
  if (score >= 75) return 'Ouro';
  if (score >= 50) return 'Prata';
  return 'Bronze';
}

function getEngagementStatus(companyId) {
  const daysWithoutInteraction = getDaysSinceLastInteraction(companyId);
  if (daysWithoutInteraction === null) return 'Dados insuficientes';
  if (daysWithoutInteraction <= 30) return 'Ativa';
  if (daysWithoutInteraction <= 90) return 'Em Risco';
  return 'Inativa';
}

function getDataIssues(company) {
  const missing = [
    ['CNPJ', company.cnpj],
    ['razao social', company.legalName],
    ['e-mail', company.email],
    ['setor', company.sector],
    ['regiao', company.region],
  ].filter(([, value]) => !value);

  return missing.map(([label]) => `Campo obrigatorio ausente: ${label}`);
}

function getRecommendedAction(company) {
  const confirmedEventIds = new Set(getConfirmedParticipations(company.id).map((item) => item.eventId));
  const participatedInTraining = events.some(
    (event) => confirmedEventIds.has(event.id) && event.pillar === 'Pilar I',
  );
  const participatedInAcceleration = events.some(
    (event) => confirmedEventIds.has(event.id) && event.pillar === 'Pilar II',
  );
  const status = getEngagementStatus(company.id);

  if (status === 'Inativa') {
    return 'Criar tarefa de ligacao de resgate e oferecer capacitacao de reentrada.';
  }

  if (participatedInTraining && !participatedInAcceleration) {
    return 'Oferecer programa do Pilar II - Solucao e Transformacao.';
  }

  if (company.companyType === 'Startup' || company.sector.includes('Tecnologia')) {
    return 'Convidar para acoes de inovacao aberta e networking com industrias.';
  }

  return 'Manter relacionamento ativo e indicar o proximo evento setorial disponivel.';
}

function getAutomaticDiagnosis(company) {
  const score = calculateEngagementScore(company.id);
  const category = getCategory(score);
  const status = getEngagementStatus(company.id);
  const days = getDaysSinceLastInteraction(company.id);
  const participationsCount = getConfirmedParticipations(company.id).length;
  const issues = getDataIssues(company);

  if (issues.length > 0) {
    return `Dados insuficientes para classificar ${company.name}. ${issues.join('; ')}. Solicite validacao humana antes de gerar recomendacoes.`;
  }

  const recency = days === null ? 'sem presenca confirmada' : `ha ${days} dias sem nova presenca confirmada`;

  return `${company.name} esta classificada como ${category}, com score ${score} e status ${status}. A empresa possui ${participationsCount} presenca(s) confirmada(s) e esta ${recency}. Proxima melhor acao: ${getRecommendedAction(company)}`;
}

function getCompanySummary(company) {
  const score = calculateEngagementScore(company.id);

  return {
    ...company,
    score,
    category: getCategory(score),
    status: getEngagementStatus(company.id),
    confirmedParticipations: getConfirmedParticipations(company.id).length,
    daysWithoutInteraction: getDaysSinceLastInteraction(company.id),
    diagnosis: getAutomaticDiagnosis(company),
    recommendedAction: getRecommendedAction(company),
  };
}

function getCompanySummaries() {
  return companies.map(getCompanySummary).sort((a, b) => b.score - a.score);
}

function filterSummariesByQuery(summaries, query = {}) {
  const selectedSector = String(query.sector || '').trim();
  const selectedRegion = String(query.region || '').trim();
  const selectedStatus = String(query.status || '').trim();
  const selectedPeriod = String(query.period || '').trim();

  const dateRange = buildDateRange(selectedPeriod);

  return summaries.filter((company) => {
    const matchesSector = !selectedSector || company.sector === selectedSector;
    const matchesRegion = !selectedRegion || company.region === selectedRegion;
    const matchesStatus = !selectedStatus || company.status === selectedStatus;

    if (!dateRange) {
      return matchesSector && matchesRegion && matchesStatus;
    }

    const lastInteraction = getLastInteractionDate(company.id);
    const matchesPeriod = lastInteraction ? lastInteraction >= dateRange.start && lastInteraction <= dateRange.end : false;

    return matchesSector && matchesRegion && matchesStatus && matchesPeriod;
  });
}

function getCompanyById(companyId) {
  return companies.find((company) => company.id === Number(companyId)) || null;
}

function getRecentParticipationHistory(companyId) {
  return getConfirmedParticipations(companyId)
    .map((participation) => {
      const event = events.find((item) => item.id === participation.eventId);

      return {
        date: participation.date,
        event: event ? event.name : `Evento ${participation.eventId}`,
        type: event ? event.type : 'Participacao',
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getEngagementHistory(companyId) {
  const score = calculateEngagementScore(companyId);
  const start = Math.max(25, score - 25);

  return [
    { month: 'Jan', score: Math.max(20, start) },
    { month: 'Fev', score: Math.max(30, start + 5) },
    { month: 'Mar', score: Math.max(40, start + 10) },
    { month: 'Abr', score: Math.max(50, start + 15) },
    { month: 'Mai', score: Math.max(60, start + 20) },
    { month: 'Jun', score: score },
  ];
}

function getInsightCards(company) {
  const score = calculateEngagementScore(company.id);

  return [
    {
      title: 'Alta Performance',
      description: `Empresa esta ${Math.max(0, score - 10)}% acima da linha de base de engajamento estimada para o setor ${company.sector}.`,
      tone: 'blue',
    },
    {
      title: 'Crescimento Consistente',
      description: `Score de engajamento variou positivamente ao longo dos ultimos 6 meses e hoje esta em ${score}.`,
      tone: 'green',
    },
    {
      title: 'Recomendacao',
      description: getRecommendedAction(company),
      tone: 'purple',
    },
  ];
}

function countBy(items, keySelector) {
  return items.reduce((accumulator, item) => {
    const key = keySelector(item);
    accumulator.set(key, (accumulator.get(key) || 0) + 1);
    return accumulator;
  }, new Map());
}

function getDashboardPayload(query = {}) {
  const allSummaries = getCompanySummaries();
  const summaries = filterSummariesByQuery(allSummaries, query);
  const totalCompanies = summaries.length;
  const totalParticipations = participations.filter((item) => item.confirmed).length;
  const averageEngagement = totalCompanies ? summaries.reduce((accumulator, company) => accumulator + company.score, 0) / totalCompanies : 0;

  const confirmedByPillar = countBy(
    participations.filter((item) => item.confirmed),
    (participation) => events.find((event) => event.id === participation.eventId)?.pillar || 'Outros',
  );

  const confirmedByMonth = countBy(
    participations.filter((item) => item.confirmed),
    (participation) => {
      const monthIndex = new Date(`${participation.date}T00:00:00`).getMonth();
      return ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][monthIndex];
    },
  );

  const regionCounts = countBy(summaries, (company) => company.region);
  const sectorCounts = countBy(summaries, (company) => company.sector);

  return {
    appliedFilters: {
      period: String(query.period || 'all'),
      sector: String(query.sector || ''),
      region: String(query.region || ''),
      status: String(query.status || ''),
    },
    totals: {
      totalCompanies,
      engagedCompanies: summaries.filter((company) => company.status === 'Ativa').length,
      totalParticipations,
      engagementRate: Math.round(averageEngagement * 10) / 10,
    },
    sectors: Array.from(sectorCounts.entries()).map(([name, companiesCount]) => ({ name, companies: companiesCount })),
    syndicates: Array.from(sectorCounts.entries()).map(([sector, companiesCount]) => ({ name: `Sindicato ${sector}`, sector, companies: companiesCount })),
    engagementByPillar: Array.from(confirmedByPillar.entries()).map(([pillar, value]) => ({ pillar, value })),
    participationOverTime: Array.from(confirmedByMonth.entries()).map(([month, participacoes]) => ({ month, participacoes })),
    topCompanies: summaries.slice(0, 5).map((company) => ({ name: company.name, score: company.score, participation: company.confirmedParticipations })),
    regions: Array.from(regionCounts.entries()).map(([name, companiesCount]) => ({ name, companies: companiesCount, engagement: summaries.find((company) => company.region === name)?.score || 0 })),
    availableFilters: {
      sectors: Array.from(new Set(allSummaries.map((company) => company.sector))).sort(),
      regions: Array.from(new Set(allSummaries.map((company) => company.region))).sort(),
      statuses: Array.from(new Set(allSummaries.map((company) => company.status))).sort(),
    },
  };
}

function getEngagementPayload() {
  const summaries = getCompanySummaries();
  const bySector = countBy(summaries, (company) => company.sector);

  return {
    kpis: [
      { label: 'Participacoes Totais', value: String(participations.filter((item) => item.confirmed).length) },
      { label: 'Media de Engajamento', value: `${Math.round((summaries.reduce((accumulator, company) => accumulator + company.score, 0) / summaries.length) * 10) / 10}%` },
      { label: 'Empresas Ativas', value: String(summaries.filter((company) => company.status === 'Ativa').length) },
      { label: 'Certificacoes', value: String(Math.max(1, summaries.filter((company) => company.category === 'Ouro' || company.category === 'Diamante').length)) },
    ],
    engagementBySector: Array.from(bySector.entries()).map(([sector, companiesCount]) => ({ sector, engagement: summaries.find((company) => company.sector === sector)?.score || 0, companies: companiesCount })),
    growthData: [
      { month: 'Jan', crescimento: 5.2 },
      { month: 'Fev', crescimento: 6.8 },
      { month: 'Mar', crescimento: 8.1 },
      { month: 'Abr', crescimento: 9.5 },
      { month: 'Mai', crescimento: 11.2 },
      { month: 'Jun', crescimento: 12.7 },
    ],
    participationByType: [
      { name: 'Capacitacao', value: 856, color: '#3b82f6' },
      { name: 'Eventos', value: 645, color: '#8b5cf6' },
      { name: 'Programas', value: 523, color: '#10b981' },
      { name: 'Consultorias', value: 378, color: '#f59e0b' },
      { name: 'Certificacoes', value: 342, color: '#ef4444' },
    ],
    topEngagement: summaries.map((company) => ({ company: company.name, score: company.score, sector: company.sector })),
  };
}

function getReportsPayload() {
  return {
    reportTypes: [
      { title: 'Relatorio Executivo', description: 'Visao geral estrategica com KPIs e indicadores principais', icon: 'FileText', color: 'bg-blue-50 text-blue-600' },
      { title: 'Analise de Engajamento', description: 'Detalhamento completo de participacao por empresa e setor', icon: 'TrendingUp', color: 'bg-purple-50 text-purple-600' },
      { title: 'Indicadores Regionais', description: 'Distribuicao geografica e desempenho por territorio', icon: 'FileBarChart', color: 'bg-green-50 text-green-600' },
      { title: 'Exportacao de Dados', description: 'Base completa para analise em Excel ou Power BI', icon: 'FileSpreadsheet', color: 'bg-orange-50 text-orange-600' },
    ],
    recentReports: [
      { name: 'Relatorio Mensal - Maio 2026', date: '10/05/2026', time: '14:30', type: 'PDF', size: '2.4 MB' },
      { name: 'Analise Trimestral Q1 2026', date: '01/04/2026', time: '09:15', type: 'PDF', size: '5.1 MB' },
      { name: 'Base de Dados - Empresas Ativas', date: '25/04/2026', time: '16:45', type: 'XLSX', size: '1.8 MB' },
      { name: 'Dashboard Power BI - Engajamento', date: '18/04/2026', time: '11:20', type: 'PBIX', size: '3.2 MB' },
      { name: 'Relatorio Anual 2025', date: '15/01/2026', time: '10:00', type: 'PDF', size: '8.7 MB' },
    ],
    usageStats: [
      { value: 127, label: 'Relatorios gerados', detail: 'Ultimos 30 dias', color: 'blue' },
      { value: 45, label: 'Exportacoes realizadas', detail: 'Este mes', color: 'green' },
      { value: 12, label: 'Dashboards criados', detail: 'Power BI', color: 'purple' },
      { value: 3, label: 'Agendamentos ativos', detail: 'Automaticos', color: 'orange' },
    ],
  };
}

function getSettingsPayload() {
  return {
    platformName: 'HUB Fibra',
    version: '1.0.0',
    notifications: [
      { label: 'E-mail diario', enabled: true },
      { label: 'Alertas de engajamento', enabled: true },
      { label: 'Relatorios semanais', enabled: false },
    ],
    users: [
      { name: 'Admin User', email: 'admin@fiep.com.br', role: 'Administrador' },
      { name: 'Joao Silva', email: 'joao.silva@fiep.com.br', role: 'Analista' },
      { name: 'Maria Santos', email: 'maria.santos@fiep.com.br', role: 'Analista' },
      { name: 'Carlos Oliveira', email: 'carlos@fiep.com.br', role: 'Visualizador' },
    ],
    support: { email: 'suporte@crmindstrial.com.br' },
  };
}

function getAlertsPayload() {
  return getCompanySummaries()
    .filter((company) => company.status === 'Em Risco' || company.status === 'Inativa')
    .map((company) => ({
      company: company.name,
      status: company.status,
      score: company.score,
      description: company.status === 'Inativa'
        ? `${company.name} nao tem presenca confirmada ha mais de 90 dias.`
        : `${company.name} esta ha mais de 30 dias sem nova presenca confirmada.`,
      action: company.recommendedAction,
    }));
}

function getRecommendationsPayload() {
  return getCompanySummaries().map((company) => ({
    company: company.name,
    score: company.score,
    category: company.category,
    action: company.recommendedAction,
  }));
}

function upsertCompany(companyId, data) {
  const index = companies.findIndex((company) => company.id === Number(companyId));
  if (index === -1) {
    return null;
  }

  companies[index] = { ...companies[index], ...data, id: companies[index].id };
  return companies[index];
}

function createCompany(data) {
  const nextId = companies.length ? Math.max(...companies.map((company) => company.id)) + 1 : 1;
  const company = {
    id: nextId,
    name: normalizeText(data.name),
    legalName: normalizeText(data.legalName),
    cnpj: normalizeText(data.cnpj),
    cep: normalizeText(data.cep),
    cnae: normalizeText(data.cnae),
    address: normalizeText(data.address),
    region: normalizeText(data.region),
    contact: normalizeText(data.contact || data.manager),
    manager: normalizeText(data.manager || data.contact),
    phone: normalizeText(data.phone),
    email: normalizeText(data.email),
    sector: normalizeText(data.sector),
    size: data.size || 'Pequena empresa',
    companyType: data.companyType || 'Industria',
    employees: Number(data.employees || 0),
    ledByWoman: Boolean(data.ledByWoman),
    unionMember: Boolean(data.unionMember),
    maturity: data.maturity || 'Inicial',
    registeredAt: data.registeredAt || new Date().toISOString().slice(0, 10),
  };

  companies.push(company);
  return company;
}

function deleteCompany(companyId) {
  const index = companies.findIndex((company) => company.id === Number(companyId));
  if (index === -1) {
    return false;
  }

  companies.splice(index, 1);
  return true;
}

module.exports = {
  companies,
  events,
  participations,
  getCompanyById,
  getCompanySummaries,
  getConfirmedParticipations,
  getRecentParticipationHistory,
  getEngagementHistory,
  getInsightCards,
  calculateEngagementScore,
  getEngagementStatus,
  getCategory,
  getDataIssues,
  getRecommendedAction,
  getAutomaticDiagnosis,
  getCompanySummary,
  getDashboardPayload,
  getEngagementPayload,
  getReportsPayload,
  getSettingsPayload,
  getAlertsPayload,
  getRecommendationsPayload,
  upsertCompany,
  createCompany,
  deleteCompany,
};
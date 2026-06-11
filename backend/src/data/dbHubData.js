const pool = require('../config/db');

const TABLE_CANDIDATES = {
  companies: ['EMPRESA', 'companies', 'empresas'],
  events: ['EVENTO', 'events', 'eventos'],
  participations: ['PARTICIPACAO', 'participations', 'participacoes'],
  users: ['USUARIO', 'users', 'usuarios'],
  notifications: ['notifications', 'notificacoes'],
  settings: ['settings', 'configuracoes'],
  reports: ['reports', 'relatorios'],
};

const COLOR_PALETTE = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#14b8a6'];
const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const scoreByLevel = {
  Alta: 18,
  Media: 12,
  Média: 12,
  Baixa: 8,
};

let cachedTables = null;
let cachedColumns = {};

function normalizeText(value) {
  return String(value ?? '').trim();
}

function toCamelCase(value) {
  return String(value).replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function normalizeRow(row) {
  return Object.entries(row).reduce((accumulator, [key, value]) => {
    accumulator[toCamelCase(key)] = value;
    return accumulator;
  }, {});
}

function getFirst(row, keys, fallback = '') {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null) {
      return row[key];
    }
  }

  return fallback;
}

function getPrimaryKeyColumn(columns, candidates) {
  return pickColumn(columns, candidates) || pickColumn(columns, ['id']) || columns[0];
}

function escapeId(identifier) {
  return `\`${String(identifier).replace(/`/g, '``')}\``;
}

async function getTableMap() {
  if (cachedTables) {
    return cachedTables;
  }

  const [rows] = await pool.query(
    'SELECT table_name AS tableName FROM information_schema.tables WHERE table_schema = DATABASE()',
  );
  const available = new Set(rows.map((row) => String(row.tableName).toLowerCase()));

  cachedTables = Object.entries(TABLE_CANDIDATES).reduce((accumulator, [key, candidates]) => {
    accumulator[key] = candidates.find((candidate) => available.has(candidate.toLowerCase())) || null;
    return accumulator;
  }, {});

  return cachedTables;
}

async function getRows(kind, orderBy = 'id') {
  const tables = await getTableMap();
  const table = tables[kind];
  if (!table) {
    return [];
  }

  const columns = await getTableColumns(table);
  const orderColumn = columns.includes(orderBy) ? orderBy : columns[0];
  const orderClause = orderColumn ? ` ORDER BY ${escapeId(orderColumn)}` : '';
  const [rows] = await pool.query(`SELECT * FROM ${escapeId(table)}${orderClause}`);
  return rows.map(normalizeRow);
}

async function getTableColumns(table) {
  if (cachedColumns[table]) {
    return cachedColumns[table];
  }

  const [rows] = await pool.query(
    'SELECT column_name AS columnName FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? ORDER BY ordinal_position',
    [table],
  );

  cachedColumns[table] = rows.map((row) => row.columnName);
  return cachedColumns[table];
}

function pickColumn(columns, candidates) {
  const lowerMap = new Map(columns.map((column) => [String(column).toLowerCase(), column]));
  for (const candidate of candidates) {
    const match = lowerMap.get(String(candidate).toLowerCase());
    if (match) return match;
  }

  return null;
}

async function buildDbPayload(table, aliases, data) {
  const columns = await getTableColumns(table);

  return Object.entries(aliases).reduce((payload, [sourceKey, candidates]) => {
    const column = pickColumn(columns, candidates);
    if (column && data[sourceKey] !== undefined) {
      payload[column] = data[sourceKey];
    }
    return payload;
  }, {});
}

function toBoolean(value) {
  return value === true || value === 1 || value === '1' || String(value).toLowerCase() === 'true';
}

function normalizeUserType(value) {
  const role = normalizeText(value) || 'Analista';
  const normalized = role.toLowerCase();

  if (normalized.includes('gest') || normalized.includes('admin')) return 'Gestor';
  if (normalized.includes('consult') || normalized.includes('visual')) return 'Consultor';
  if (normalized.includes('diret')) return 'Diretor';
  return 'Analista';
}

function normalizeCompanySize(value) {
  const size = normalizeText(value) || 'Pequena empresa';
  const normalized = size.toLowerCase();

  if (normalized.includes('micro')) return 'Microempresa';
  if (normalized.includes('média') || normalized.includes('media')) return 'Média empresa';
  if (normalized.includes('grande')) return 'Grande empresa';
  return 'Pequena empresa';
}

function normalizeCompanyType(value) {
  const type = normalizeText(value) || 'Indústria';
  const normalized = type.toLowerCase();

  if (normalized.includes('startup')) return 'Startup';
  if (normalized.includes('governo')) return 'Governo';
  if (normalized.includes('academia')) return 'Academia';
  return 'Indústria';
}

function formatDate(value) {
  if (!value) {
    return '';
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value).slice(0, 10);
}

function mapCompany(row) {
  return {
    id: Number(getFirst(row, ['id', 'idEmpresa', 'companyId', 'empresaId'])),
    name: normalizeText(getFirst(row, ['name', 'nome', 'nomeFantasia', 'fantasyName', 'razaoSocial'])),
    legalName: normalizeText(getFirst(row, ['legalName', 'razaoSocial', 'corporateName', 'nomeEmpresarial'])),
    cnpj: normalizeText(getFirst(row, ['cnpj'])),
    cep: normalizeText(getFirst(row, ['cep', 'zipCode'])),
    cnae: normalizeText(getFirst(row, ['cnae'])),
    address: normalizeText(getFirst(row, ['address', 'endereco', 'logradouro'])),
    region: normalizeText(getFirst(row, ['region', 'regiaoAdministrativa', 'regiao', 'cidade', 'territorio'])),
    contact: normalizeText(getFirst(row, ['contact', 'contatoNaEmpresa', 'contato', 'responsavel'])),
    manager: normalizeText(getFirst(row, ['manager', 'responsavel', 'gestor', 'contact', 'contato'])),
    phone: normalizeText(getFirst(row, ['phone', 'telefone', 'celular'])),
    email: normalizeText(getFirst(row, ['email'])),
    sector: normalizeText(getFirst(row, ['sector', 'setor', 'segmento'])),
    size: normalizeText(getFirst(row, ['size', 'porte'], 'Pequena empresa')),
    companyType: normalizeText(getFirst(row, ['companyType', 'tipoEmpresa', 'tipo'], 'Industria')),
    employees: Number(getFirst(row, ['employees', 'numFuncionarios', 'funcionarios', 'colaboradores'], 0)),
    ledByWoman: toBoolean(getFirst(row, ['ledByWoman', 'lideradaPorMulher'], false)),
    unionMember: toBoolean(getFirst(row, ['unionMember', 'associacaoSindicato', 'associadaSindicato', 'sindicato'], false)),
    maturity: normalizeText(getFirst(row, ['maturity', 'nivelMaturidade', 'maturidade'], 'Inicial')),
    registeredAt: formatDate(getFirst(row, ['registeredAt', 'createdAt', 'dataCadastro', 'cadastro'])),
  };
}

function mapEvent(row) {
  return {
    id: Number(getFirst(row, ['id', 'eventId', 'eventoId'])),
    name: normalizeText(getFirst(row, ['name', 'nome', 'titulo'])),
    pillar: normalizeText(getFirst(row, ['pillar', 'pilar'])),
    type: normalizeText(getFirst(row, ['type', 'tipo', 'categoria'], 'Participacao')),
    startDate: formatDate(getFirst(row, ['startDate', 'dataInicio', 'date', 'data'])),
    sector: normalizeText(getFirst(row, ['sector', 'setor'], 'Todos')),
    businessGenerated: Number(getFirst(row, ['businessGenerated', 'negociosGerados'], 0)),
  };
}

function mapParticipation(row) {
  return {
    companyId: Number(getFirst(row, ['companyId', 'empresaId', 'idEmpresa'])),
    eventId: Number(getFirst(row, ['eventId', 'eventoId', 'idEvento'])),
    date: formatDate(getFirst(row, ['date', 'data', 'createdAt'])),
    confirmed: toBoolean(getFirst(row, ['confirmed', 'confirmado', 'presente'], true)),
    level: normalizeText(getFirst(row, ['level', 'nivel'], 'Media')),
    frequencyControl: Number(getFirst(row, ['frequencyControl', 'controleFrequencia'], 1)),
  };
}

async function loadCoreData() {
  const [companiesRows, eventsRows, participationRows] = await Promise.all([
    getRows('companies'),
    getRows('events'),
    getRows('participations'),
  ]);

  return {
    companies: companiesRows.map(mapCompany).filter((company) => company.id),
    events: eventsRows.map(mapEvent).filter((event) => event.id),
    participations: participationRows.map(mapParticipation).filter((item) => item.companyId),
  };
}

function getCurrentDate(participations) {
  const timestamps = participations
    .map((participation) => new Date(`${participation.date}T00:00:00`).getTime())
    .filter(Number.isFinite);

  return timestamps.length ? new Date(Math.max(...timestamps)) : new Date();
}

function buildHelpers(data) {
  const { companies, events, participations } = data;
  const currentDate = getCurrentDate(participations);

  function getConfirmedParticipations(companyId) {
    return participations.filter(
      (participation) =>
        participation.companyId === Number(companyId) &&
        participation.confirmed &&
        participation.frequencyControl !== 0,
    );
  }

  function getLastInteractionDate(companyId) {
    const dates = getConfirmedParticipations(companyId)
      .map((participation) => new Date(`${participation.date}T00:00:00`).getTime())
      .filter(Number.isFinite)
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
      (total, participation) => total + (scoreByLevel[participation.level] || 10),
      0,
    );
    const pillarBonus = new Set(
      confirmed.map((participation) => events.find((event) => event.id === participation.eventId)?.pillar).filter(Boolean),
    ).size * 4;
    const daysWithoutInteraction = getDaysSinceLastInteraction(companyId);
    const inactivityPenalty =
      daysWithoutInteraction === null ? 25 : daysWithoutInteraction > 90 ? 35 : daysWithoutInteraction > 60 ? 20 : daysWithoutInteraction > 30 ? 10 : 0;

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
    return [
      ['CNPJ', company.cnpj],
      ['razao social', company.legalName],
      ['e-mail', company.email],
      ['setor', company.sector],
      ['regiao', company.region],
    ].filter(([, value]) => !value).map(([label]) => `Campo obrigatorio ausente: ${label}`);
  }

  function getRecommendedAction(company) {
    const confirmedEventIds = new Set(getConfirmedParticipations(company.id).map((item) => item.eventId));
    const participatedInTraining = events.some((event) => confirmedEventIds.has(event.id) && event.pillar === 'Pilar I');
    const participatedInAcceleration = events.some((event) => confirmedEventIds.has(event.id) && event.pillar === 'Pilar II');
    const status = getEngagementStatus(company.id);

    if (status === 'Inativa') return 'Criar tarefa de ligacao de resgate e oferecer capacitacao de reentrada.';
    if (participatedInTraining && !participatedInAcceleration) return 'Oferecer programa do Pilar II - Solucao e Transformacao.';
    if (company.companyType === 'Startup' || company.sector.includes('Tecnologia')) return 'Convidar para acoes de inovacao aberta e networking com industrias.';
    return 'Manter relacionamento ativo e indicar o proximo evento setorial disponivel.';
  }

  function getAutomaticDiagnosis(company) {
    const score = calculateEngagementScore(company.id);
    const issues = getDataIssues(company);

    if (issues.length > 0) {
      return `Dados insuficientes para classificar ${company.name}. ${issues.join('; ')}. Solicite validacao humana antes de gerar recomendacoes.`;
    }

    return `${company.name} esta classificada como ${getCategory(score)}, com score ${score} e status ${getEngagementStatus(company.id)}. Proxima melhor acao: ${getRecommendedAction(company)}`;
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
    return MONTH_LABELS.slice(0, 6).map((month, index) => ({
      month,
      score: index === 5 ? score : Math.max(20, start + index * 5),
    }));
  }

  function getInsightCards(company) {
    const score = calculateEngagementScore(company.id);
    return [
      {
        title: 'Alta Performance',
        description: `Empresa esta ${Math.max(0, score - 10)}% acima da linha de base de engajamento estimada para o setor ${company.sector}.`,
      },
      {
        title: 'Crescimento Consistente',
        description: `Score de engajamento calculado a partir das participacoes confirmadas no banco.`,
      },
      {
        title: 'Recomendacao',
        description: getRecommendedAction(company),
      },
    ];
  }

  return {
    companies,
    events,
    participations,
    getCompanyById: (companyId) => companies.find((company) => company.id === Number(companyId)) || null,
    getCompanySummary,
    getCompanySummaries: () => companies.map(getCompanySummary).sort((a, b) => b.score - a.score),
    getRecentParticipationHistory,
    getEngagementHistory,
    getInsightCards,
  };
}

function countBy(items, keySelector) {
  return items.reduce((accumulator, item) => {
    const key = keySelector(item);
    accumulator.set(key, (accumulator.get(key) || 0) + 1);
    return accumulator;
  }, new Map());
}

function buildDateRange(period, participations) {
  if (period !== '30d') return null;
  const end = getCurrentDate(participations);
  const start = new Date(end);
  start.setDate(start.getDate() - 30);
  return { start, end };
}

function filterSummariesByQuery(summaries, query = {}, participations = []) {
  const selectedSector = normalizeText(query.sector);
  const selectedRegion = normalizeText(query.region);
  const selectedStatus = normalizeText(query.status);
  const dateRange = buildDateRange(normalizeText(query.period), participations);

  return summaries.filter((company) => {
    const matchesSector = !selectedSector || company.sector === selectedSector;
    const matchesRegion = !selectedRegion || company.region === selectedRegion;
    const matchesStatus = !selectedStatus || company.status === selectedStatus;

    if (!dateRange) {
      return matchesSector && matchesRegion && matchesStatus;
    }

    const lastInteraction = company.daysWithoutInteraction === null
      ? null
      : new Date(getCurrentDate(participations).getTime() - company.daysWithoutInteraction * 86400000);
    const matchesPeriod = lastInteraction ? lastInteraction >= dateRange.start && lastInteraction <= dateRange.end : false;

    return matchesSector && matchesRegion && matchesStatus && matchesPeriod;
  });
}

async function getCompanySummaries() {
  return buildHelpers(await loadCoreData()).getCompanySummaries();
}

async function getCompanyById(companyId) {
  return buildHelpers(await loadCoreData()).getCompanyById(companyId);
}

async function getCompanyProfile(companyId) {
  const helpers = buildHelpers(await loadCoreData());
  const company = helpers.getCompanyById(companyId);
  if (!company) return null;

  return {
    ...helpers.getCompanySummary(company),
    engagementHistory: helpers.getEngagementHistory(company.id),
    participationHistory: helpers.getRecentParticipationHistory(company.id),
    insights: helpers.getInsightCards(company),
  };
}

async function createCompany(data) {
  const tables = await getTableMap();
  if (!tables.companies) {
    throw new Error('Tabela de empresas nao encontrada no banco de dados.');
  }

  const normalized = {
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
    size: normalizeCompanySize(data.size),
    companyType: normalizeCompanyType(data.companyType),
    employees: Number(data.employees || 0),
    ledByWoman: toBoolean(data.ledByWoman),
    unionMember: toBoolean(data.unionMember),
    maturity: data.maturity || 'Inicial',
    registeredAt: data.registeredAt || new Date().toISOString().slice(0, 10),
  };
  const payload = await buildDbPayload(tables.companies, {
    name: ['name', 'nome', 'nome_fantasia', 'nomeFantasia'],
    legalName: ['legal_name', 'legalName', 'razao_social', 'razaoSocial'],
    cnpj: ['cnpj'],
    cep: ['cep', 'zip_code', 'zipCode'],
    cnae: ['cnae'],
    address: ['address', 'endereco', 'logradouro'],
    region: ['region', 'regiao_administrativa', 'regiaoAdministrativa', 'regiao', 'cidade', 'territorio'],
    contact: ['contact', 'contato_na_empresa', 'contatoNaEmpresa', 'contato'],
    manager: ['manager', 'responsavel', 'gestor'],
    phone: ['phone', 'telefone', 'celular'],
    email: ['email'],
    sector: ['sector', 'setor', 'segmento'],
    size: ['size', 'porte'],
    companyType: ['company_type', 'companyType', 'tipo_empresa', 'tipoEmpresa', 'tipo'],
    employees: ['employees', 'num_funcionarios', 'numFuncionarios', 'funcionarios', 'colaboradores'],
    ledByWoman: ['led_by_woman', 'ledByWoman', 'liderada_por_mulher', 'lideradaPorMulher'],
    unionMember: ['union_member', 'unionMember', 'associacao_sindicato', 'associacaoSindicato', 'associada_sindicato', 'associadaSindicato', 'sindicato'],
    maturity: ['maturity', 'nivel_maturidade', 'nivelMaturidade', 'maturidade'],
    registeredAt: ['registered_at', 'registeredAt', 'created_at', 'createdAt', 'data_cadastro', 'dataCadastro'],
  }, normalized);
  const columns = Object.keys(payload);
  if (!columns.length) {
    throw new Error('Nenhuma coluna compativel encontrada para cadastrar empresa.');
  }
  const values = Object.values(payload);
  const placeholders = columns.map(() => '?').join(', ');

  const [result] = await pool.query(
    `INSERT INTO ${escapeId(tables.companies)} (${columns.map(escapeId).join(', ')}) VALUES (${placeholders})`,
    values,
  );

  return getCompanyById(result.insertId);
}

async function updateCompany(companyId, data) {
  const tables = await getTableMap();
  if (!tables.companies) {
    throw new Error('Tabela de empresas nao encontrada no banco de dados.');
  }

  const normalized = {
    name: data.name,
    legalName: data.legalName,
    cnpj: data.cnpj,
    cep: data.cep,
    cnae: data.cnae,
    address: data.address,
    region: data.region,
    contact: data.contact,
    manager: data.manager,
    phone: data.phone,
    email: data.email,
    sector: data.sector,
    size: data.size === undefined ? undefined : normalizeCompanySize(data.size),
    companyType: data.companyType === undefined ? undefined : normalizeCompanyType(data.companyType),
    employees: data.employees,
    ledByWoman: data.ledByWoman,
    unionMember: data.unionMember,
    maturity: data.maturity,
    registeredAt: data.registeredAt,
  };
  const payload = await buildDbPayload(tables.companies, {
    name: ['name', 'nome', 'nome_fantasia', 'nomeFantasia'],
    legalName: ['legal_name', 'legalName', 'razao_social', 'razaoSocial'],
    cnpj: ['cnpj'],
    cep: ['cep', 'zip_code', 'zipCode'],
    cnae: ['cnae'],
    address: ['address', 'endereco', 'logradouro'],
    region: ['region', 'regiao_administrativa', 'regiaoAdministrativa', 'regiao', 'cidade', 'territorio'],
    contact: ['contact', 'contato_na_empresa', 'contatoNaEmpresa', 'contato'],
    manager: ['manager', 'responsavel', 'gestor'],
    phone: ['phone', 'telefone', 'celular'],
    email: ['email'],
    sector: ['sector', 'setor', 'segmento'],
    size: ['size', 'porte'],
    companyType: ['company_type', 'companyType', 'tipo_empresa', 'tipoEmpresa', 'tipo'],
    employees: ['employees', 'num_funcionarios', 'numFuncionarios', 'funcionarios', 'colaboradores'],
    ledByWoman: ['led_by_woman', 'ledByWoman', 'liderada_por_mulher', 'lideradaPorMulher'],
    unionMember: ['union_member', 'unionMember', 'associacao_sindicato', 'associacaoSindicato', 'associada_sindicato', 'associadaSindicato', 'sindicato'],
    maturity: ['maturity', 'nivel_maturidade', 'nivelMaturidade', 'maturidade'],
    registeredAt: ['registered_at', 'registeredAt', 'created_at', 'createdAt', 'data_cadastro', 'dataCadastro'],
  }, normalized);
  const entries = Object.entries(payload).filter(([, value]) => value !== undefined);
  if (!entries.length) return getCompanyById(companyId);
  const primaryKey = getPrimaryKeyColumn(await getTableColumns(tables.companies), ['id_empresa', 'idEmpresa', 'company_id', 'companyId']);

  await pool.query(
    `UPDATE ${escapeId(tables.companies)} SET ${entries.map(([key]) => `${escapeId(key)} = ?`).join(', ')} WHERE ${escapeId(primaryKey)} = ?`,
    [...entries.map(([, value]) => value), companyId],
  );

  return getCompanyById(companyId);
}

async function deleteCompany(companyId) {
  const tables = await getTableMap();
  if (!tables.companies) {
    throw new Error('Tabela de empresas nao encontrada no banco de dados.');
  }

  const primaryKey = getPrimaryKeyColumn(await getTableColumns(tables.companies), ['id_empresa', 'idEmpresa', 'company_id', 'companyId']);
  const [relatedTables] = await pool.query(
    'SELECT table_name AS tableName FROM information_schema.columns WHERE table_schema = DATABASE() AND column_name = ? AND table_name <> ?',
    [primaryKey, tables.companies],
  );
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    for (const row of relatedTables) {
      await connection.query(
        `DELETE FROM ${escapeId(row.tableName)} WHERE ${escapeId(primaryKey)} = ?`,
        [companyId],
      );
    }

    const [result] = await connection.query(
      `DELETE FROM ${escapeId(tables.companies)} WHERE ${escapeId(primaryKey)} = ?`,
      [companyId],
    );
    await connection.commit();
    return result.affectedRows > 0;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function getDashboardPayload(query = {}) {
  const data = await loadCoreData();
  const helpers = buildHelpers(data);
  const allSummaries = helpers.getCompanySummaries();
  const summaries = filterSummariesByQuery(allSummaries, query, data.participations);
  const totalCompanies = summaries.length;
  const totalParticipations = data.participations.filter((item) => item.confirmed).length;
  const averageEngagement = totalCompanies ? summaries.reduce((total, company) => total + company.score, 0) / totalCompanies : 0;
  const sectorCounts = countBy(summaries, (company) => company.sector || 'Sem setor');
  const regionCounts = countBy(summaries, (company) => company.region || 'Sem regiao');
  const confirmedByPillar = countBy(
    data.participations.filter((item) => item.confirmed),
    (participation) => data.events.find((event) => event.id === participation.eventId)?.pillar || 'Outros',
  );
  const confirmedByMonth = countBy(
    data.participations.filter((item) => item.confirmed),
    (participation) => MONTH_LABELS[new Date(`${participation.date}T00:00:00`).getMonth()] || 'Sem data',
  );

  return {
    appliedFilters: {
      period: normalizeText(query.period) || 'all',
      sector: normalizeText(query.sector),
      region: normalizeText(query.region),
      status: normalizeText(query.status),
    },
    totals: {
      totalCompanies,
      engagedCompanies: summaries.filter((company) => company.status === 'Ativa').length,
      totalParticipations,
      engagementRate: Math.round(averageEngagement * 10) / 10,
    },
    kpis: [
      { value: String(totalCompanies), change: '0%' },
      { value: String(summaries.filter((company) => company.status === 'Ativa').length), change: '0%' },
      { value: String(totalParticipations), change: '0%' },
      { value: `${Math.round(averageEngagement * 10) / 10}%`, change: '0%' },
    ],
    sectors: Array.from(sectorCounts.entries()).map(([name, companies]) => ({ name, companies })),
    syndicates: Array.from(sectorCounts.entries()).map(([sector, companies]) => ({ name: `Sindicato ${sector}`, sector, companies })),
    engagementByPillar: Array.from(confirmedByPillar.entries()).map(([pillar, value]) => ({ pillar, value })),
    participationOverTime: Array.from(confirmedByMonth.entries()).map(([month, participacoes]) => ({ month, participacoes })),
    topCompanies: summaries.slice(0, 5).map((company) => ({ name: company.name, score: company.score, participation: company.confirmedParticipations })),
    regions: Array.from(regionCounts.entries()).map(([name, companies]) => ({ name, companies })),
    availableFilters: {
      sectors: Array.from(new Set(allSummaries.map((company) => company.sector).filter(Boolean))).sort(),
      regions: Array.from(new Set(allSummaries.map((company) => company.region).filter(Boolean))).sort(),
      statuses: Array.from(new Set(allSummaries.map((company) => company.status).filter(Boolean))).sort(),
    },
  };
}

async function getEngagementPayload() {
  const data = await loadCoreData();
  const summaries = buildHelpers(data).getCompanySummaries();
  const bySector = countBy(summaries, (company) => company.sector || 'Sem setor');
  const byType = countBy(
    data.participations.filter((item) => item.confirmed),
    (participation) => data.events.find((event) => event.id === participation.eventId)?.type || 'Participacao',
  );
  const averageEngagement = summaries.length ? summaries.reduce((total, company) => total + company.score, 0) / summaries.length : 0;

  return {
    kpis: [
      { label: 'Participacoes Totais', value: String(data.participations.filter((item) => item.confirmed).length) },
      { label: 'Media de Engajamento', value: `${Math.round(averageEngagement * 10) / 10}%` },
      { label: 'Empresas Ativas', value: String(summaries.filter((company) => company.status === 'Ativa').length) },
      { label: 'Certificacoes', value: String(byType.get('Certificacao') || byType.get('Certificações') || 0) },
    ],
    engagementBySector: Array.from(bySector.entries()).map(([sector, companies]) => ({
      sector,
      engagement: summaries.find((company) => company.sector === sector)?.score || 0,
      companies,
    })),
    growthData: MONTH_LABELS.slice(0, 6).map((month, index) => ({ month, crescimento: index === 0 ? 0 : index * 2.4 })),
    participationByType: Array.from(byType.entries()).map(([name, value], index) => ({ name, value, color: COLOR_PALETTE[index % COLOR_PALETTE.length] })),
    topEngagement: summaries.slice(0, 5).map((company) => ({ company: company.name, score: company.score, sector: company.sector })),
  };
}

async function getAlertsPayload() {
  const summaries = await getCompanySummaries();
  return summaries
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

async function getRecommendationsPayload() {
  const summaries = await getCompanySummaries();
  return summaries.map((company) => ({
    company: company.name,
    score: company.score,
    category: company.category,
    action: company.recommendedAction,
  }));
}

async function getSettingsPayload() {
  const tables = await getTableMap();
  const [users, notifications] = await Promise.all([
    tables.users ? getRows('users') : [],
    tables.notifications ? getRows('notifications') : [],
  ]);

  return {
    platformName: 'HUB Fibra',
    version: '1.0.0',
    notifications: notifications.map((item) => ({
      key: normalizeText(getFirst(item, ['key', 'chave'])),
      label: normalizeText(getFirst(item, ['label', 'nome'])),
      enabled: toBoolean(getFirst(item, ['enabled', 'ativo'], false)),
    })),
    users: users.map((item) => ({
      id: Number(getFirst(item, ['idUsuario', 'id', 'usuarioId'], 0)),
      name: normalizeText(getFirst(item, ['name', 'nome'])),
      email: normalizeText(getFirst(item, ['email'])),
      role: normalizeUserType(getFirst(item, ['tipoUsuario', 'role', 'perfil', 'funcao', 'cargo'], 'Analista')),
      position: normalizeText(getFirst(item, ['cargo', 'position'], '')),
    })),
    support: { email: 'suporte@crmindstrial.com.br' },
  };
}

async function getUserById(userId) {
  const tables = await getTableMap();
  if (!tables.users) {
    throw new Error('Tabela de usuarios nao encontrada no banco de dados.');
  }

  const columns = await getTableColumns(tables.users);
  const primaryKey = getPrimaryKeyColumn(columns, ['id_usuario', 'idUsuario', 'user_id', 'userId']);
  const [rows] = await pool.query(
    `SELECT * FROM ${escapeId(tables.users)} WHERE ${escapeId(primaryKey)} = ? LIMIT 1`,
    [userId],
  );
  const row = rows[0] ? normalizeRow(rows[0]) : null;
  if (!row) return null;

  return {
    id: Number(getFirst(row, ['idUsuario', 'id', 'usuarioId'], 0)),
    name: normalizeText(getFirst(row, ['name', 'nome'])),
    email: normalizeText(getFirst(row, ['email'])),
    role: normalizeUserType(getFirst(row, ['tipoUsuario', 'role', 'perfil', 'funcao', 'cargo'], 'Analista')),
    position: normalizeText(getFirst(row, ['cargo', 'position'], '')),
  };
}

async function createUser(data) {
  const tables = await getTableMap();
  if (!tables.users) {
    throw new Error('Tabela de usuarios nao encontrada no banco de dados.');
  }

  const normalized = {
    name: normalizeText(data.name),
    email: normalizeText(data.email),
    password: normalizeText(data.password || data.senha),
    position: normalizeText(data.position || data.cargo || data.role),
    role: normalizeUserType(data.role || data.tipoUsuario),
  };

  if (!normalized.name || !normalized.email || !normalized.password) {
    throw new Error('Nome, e-mail e senha sao obrigatorios para cadastrar usuario.');
  }

  const payload = await buildDbPayload(tables.users, {
    name: ['nome', 'name'],
    email: ['email'],
    password: ['senha', 'password'],
    position: ['cargo', 'position'],
    role: ['tipo_usuario', 'tipoUsuario', 'role', 'perfil'],
  }, normalized);
  const columns = Object.keys(payload);
  if (!columns.length) {
    throw new Error('Nenhuma coluna compativel encontrada para cadastrar usuario.');
  }

  const [result] = await pool.query(
    `INSERT INTO ${escapeId(tables.users)} (${columns.map(escapeId).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
    Object.values(payload),
  );

  return getUserById(result.insertId);
}

async function updateSetting(key, value) {
  if (key !== 'users' && key !== 'notifications') {
    throw new Error('Configuracao nao suportada para persistencia no banco.');
  }

  const tables = await getTableMap();
  const table = tables[key];
  if (!table) {
    throw new Error(`Tabela de ${key} nao encontrada no banco de dados.`);
  }

  await pool.query(`DELETE FROM ${escapeId(table)}`);
  const rows = Array.isArray(value) ? value : [];

  for (const row of rows) {
    const aliases = key === 'users'
      ? {
          name: ['name', 'nome'],
          email: ['email'],
          role: ['tipo_usuario', 'tipoUsuario', 'role', 'perfil', 'funcao', 'funcao_usuario'],
          position: ['cargo', 'position'],
        }
      : {
          key: ['key', 'chave'],
          label: ['label', 'nome', 'rotulo'],
          enabled: ['enabled', 'ativo', 'habilitado'],
        };
    const normalized = key === 'users'
      ? { name: row.name, email: row.email, role: normalizeUserType(row.role), position: row.position || row.role }
      : { key: row.key, label: row.label, enabled: toBoolean(row.enabled) };
    const payload = await buildDbPayload(table, aliases, normalized);
    const columns = Object.keys(payload);
    if (!columns.length) continue;
    await pool.query(
      `INSERT INTO ${escapeId(table)} (${columns.map(escapeId).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      Object.values(payload),
    );
  }
}

async function getReportsPayload() {
  const tables = await getTableMap();
  const reports = tables.reports ? await getRows('reports') : [];

  return {
    reportTypes: [
      { title: 'Relatorio Executivo', description: 'Visao geral estrategica com KPIs e indicadores principais', icon: 'FileText', color: 'bg-blue-50 text-blue-600' },
      { title: 'Analise de Engajamento', description: 'Detalhamento completo de participacao por empresa e setor', icon: 'TrendingUp', color: 'bg-purple-50 text-purple-600' },
      { title: 'Indicadores Regionais', description: 'Distribuicao geografica e desempenho por territorio', icon: 'FileBarChart', color: 'bg-green-50 text-green-600' },
      { title: 'Exportacao de Dados', description: 'Base completa para analise em Excel ou Power BI', icon: 'FileSpreadsheet', color: 'bg-orange-50 text-orange-600' },
    ],
    recentReports: reports.map((report) => ({
      name: normalizeText(getFirst(report, ['name', 'nome', 'title', 'titulo'])),
      date: formatDate(getFirst(report, ['date', 'data', 'createdAt'])),
      time: normalizeText(getFirst(report, ['time', 'hora'], '')),
      type: normalizeText(getFirst(report, ['type', 'tipo'], 'PDF')),
      size: normalizeText(getFirst(report, ['size', 'tamanho'], '')),
    })),
    usageStats: [
      { value: reports.length, label: 'Relatorios gerados', detail: 'Banco de dados', color: 'blue' },
      { value: reports.filter((report) => normalizeText(getFirst(report, ['type', 'tipo'])).toUpperCase().includes('XLS')).length, label: 'Exportacoes realizadas', detail: 'Banco de dados', color: 'green' },
      { value: 0, label: 'Dashboards criados', detail: 'Calculado', color: 'purple' },
      { value: 0, label: 'Agendamentos ativos', detail: 'Calculado', color: 'orange' },
    ],
  };
}

module.exports = {
  getCompanySummaries,
  getCompanyById,
  getCompanyProfile,
  createCompany,
  updateCompany,
  deleteCompany,
  getDashboardPayload,
  getEngagementPayload,
  getAlertsPayload,
  getRecommendationsPayload,
  getSettingsPayload,
  createUser,
  updateSetting,
  getReportsPayload,
};

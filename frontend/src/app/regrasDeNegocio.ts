export type Category = "Diamante" | "Ouro" | "Prata" | "Bronze";
export type EngagementStatus = "Ativa" | "Em Risco" | "Inativa" | "Dados insuficientes";

export type HubCompany = {
  id: number;
  name: string;
  legalName: string;
  cnpj: string;
  cep: string;
  cnae: string;
  address: string;
  region: string;
  contact: string;
  manager: string;
  phone: string;
  email: string;
  sector: string;
  size: "Microempresa" | "Pequena empresa" | "Média empresa" | "Grande empresa";
  companyType: "Indústria" | "Startup" | "Governo" | "Academia";
  employees: number;
  ledByWoman: boolean;
  unionMember: boolean;
  maturity: "Inicial" | "Intermediário" | "Avançado";
  registeredAt: string;
};

export type HubEvent = {
  id: number;
  name: string;
  pillar: "Pilar I" | "Pilar II" | "Pilar III";
  type:
    | "Capacitação"
    | "Visita Técnica"
    | "Programa de Aceleração"
    | "Pré-Aceleração"
    | "Encontro de Networking"
    | "Missão"
    | "Ecossistema de Inovação"
    | "Inovação Aberta"
    | "Portal de Fornecedores";
  startDate: string;
  sector: string;
  businessGenerated: number;
};

export type Participation = {
  companyId: number;
  eventId: number;
  date: string;
  confirmed: boolean;
  level: "Alta" | "Média" | "Baixa";
  frequencyControl: 0 | 1;
};

const CURRENT_DATE = new Date("2026-06-01T00:00:00");

export const companies: HubCompany[] = [
  {
    id: 1,
    name: "TechForja",
    legalName: "TechForja Soluções Industriais LTDA",
    cnpj: "12.345.678/0001-90",
    cep: "70000-000",
    cnae: "2512-0/00",
    address: "Setor Industrial Norte, Quadra 3, Lote 15",
    region: "Plano Piloto",
    contact: "Carlos Mendes",
    manager: "Carlos Mendes",
    phone: "(61) 99999-0001",
    email: "carlos@techforja.com.br",
    sector: "Metalurgia",
    size: "Pequena empresa",
    companyType: "Indústria",
    employees: 45,
    ledByWoman: false,
    unionMember: true,
    maturity: "Intermediário",
    registeredAt: "2026-01-10",
  },
  {
    id: 2,
    name: "InovaBrasília",
    legalName: "InovaBrasília Tecnologia e Inovação LTDA",
    cnpj: "23.456.789/0001-01",
    cep: "71000-000",
    cnae: "6201-5/00",
    address: "SIG Quadra 8, Lote 2345",
    region: "Guará",
    contact: "Ana Souza",
    manager: "Ana Souza",
    phone: "(61) 99999-0002",
    email: "ana@inovadf.com.br",
    sector: "Tecnologia da Informação",
    size: "Microempresa",
    companyType: "Startup",
    employees: 12,
    ledByWoman: true,
    unionMember: false,
    maturity: "Inicial",
    registeredAt: "2026-01-10",
  },
  {
    id: 3,
    name: "AgroDF",
    legalName: "AgroDF Processamento Agroindustrial SA",
    cnpj: "34.567.890/0001-12",
    cep: "73000-000",
    cnae: "1011-2/01",
    address: "Núcleo Rural Vargem Bonita, Chácara 10",
    region: "Núcleo Bandeirante",
    contact: "Roberto Alves",
    manager: "Roberto Alves",
    phone: "(61) 99999-0003",
    email: "roberto@agrodf.com.br",
    sector: "Agroindústria",
    size: "Média empresa",
    companyType: "Indústria",
    employees: 120,
    ledByWoman: false,
    unionMember: true,
    maturity: "Avançado",
    registeredAt: "2026-01-10",
  },
  {
    id: 4,
    name: "ConstrutDF",
    legalName: "ConstrutDF Engenharia e Construção LTDA",
    cnpj: "45.678.901/0001-23",
    cep: "72000-000",
    cnae: "4120-4/00",
    address: "SIA Trecho 3, Lote 625",
    region: "Taguatinga",
    contact: "Fernanda Lima",
    manager: "Fernanda Lima",
    phone: "(61) 99999-0004",
    email: "fernanda@construtdf.com.br",
    sector: "Construção Civil",
    size: "Grande empresa",
    companyType: "Indústria",
    employees: 350,
    ledByWoman: true,
    unionMember: true,
    maturity: "Intermediário",
    registeredAt: "2026-01-10",
  },
  {
    id: 5,
    name: "EcoTêxtil",
    legalName: "EcoTêxtil Confecções Sustentáveis LTDA",
    cnpj: "56.789.012/0001-34",
    cep: "71500-000",
    cnae: "1412-6/01",
    address: "Setor de Indústrias Bernardo Sayão, Lote 14",
    region: "Ceilândia",
    contact: "Marcos Oliveira",
    manager: "Marcos Oliveira",
    phone: "(61) 99999-0005",
    email: "marcos@ecotextil.com.br",
    sector: "Têxtil",
    size: "Pequena empresa",
    companyType: "Indústria",
    employees: 60,
    ledByWoman: false,
    unionMember: false,
    maturity: "Inicial",
    registeredAt: "2026-01-10",
  },
];

export const events: HubEvent[] = [
  { id: 1, name: "Capacitação em Gestão de Inovação", pillar: "Pilar I", type: "Capacitação", startDate: "2026-02-10", sector: "Todos", businessGenerated: 0 },
  { id: 2, name: "Visita Técnica - Parque Tecnológico", pillar: "Pilar I", type: "Visita Técnica", startDate: "2026-03-05", sector: "Tecnologia", businessGenerated: 0 },
  { id: 3, name: "Programa Inova+", pillar: "Pilar II", type: "Programa de Aceleração", startDate: "2026-01-15", sector: "Todos", businessGenerated: 8 },
  { id: 4, name: "Encontro de Networking Abril", pillar: "Pilar III", type: "Encontro de Networking", startDate: "2026-04-18", sector: "Todos", businessGenerated: 12 },
  { id: 5, name: "Missão Internacional São Paulo", pillar: "Pilar III", type: "Missão", startDate: "2026-03-20", sector: "Indústria", businessGenerated: 5 },
  { id: 6, name: "Capacitação em ESG", pillar: "Pilar I", type: "Capacitação", startDate: "2026-04-05", sector: "Todos", businessGenerated: 0 },
  { id: 7, name: "Ecossistema de Inovação Aberta", pillar: "Pilar III", type: "Inovação Aberta", startDate: "2026-05-02", sector: "Tecnologia", businessGenerated: 9 },
];

export const participations: Participation[] = [
  { companyId: 1, eventId: 1, date: "2026-02-10", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 1, eventId: 2, date: "2026-03-05", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 1, eventId: 3, date: "2026-01-15", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 1, eventId: 4, date: "2026-04-18", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 1, eventId: 6, date: "2026-04-05", confirmed: true, level: "Média", frequencyControl: 1 },
  { companyId: 2, eventId: 1, date: "2026-02-10", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 2, eventId: 3, date: "2026-01-15", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 2, eventId: 4, date: "2026-04-18", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 2, eventId: 5, date: "2026-03-20", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 2, eventId: 7, date: "2026-05-02", confirmed: true, level: "Alta", frequencyControl: 1 },
  { companyId: 3, eventId: 1, date: "2026-02-10", confirmed: true, level: "Baixa", frequencyControl: 1 },
  { companyId: 3, eventId: 4, date: "2026-04-18", confirmed: false, level: "Baixa", frequencyControl: 0 },
  { companyId: 4, eventId: 1, date: "2026-02-10", confirmed: false, level: "Baixa", frequencyControl: 0 },
  { companyId: 5, eventId: 1, date: "2026-02-10", confirmed: true, level: "Média", frequencyControl: 1 },
  { companyId: 5, eventId: 4, date: "2026-04-18", confirmed: true, level: "Média", frequencyControl: 1 },
  { companyId: 5, eventId: 6, date: "2026-04-05", confirmed: true, level: "Média", frequencyControl: 1 },
];

const scoreByLevel = {
  Alta: 18,
  Média: 12,
  Baixa: 8,
};

export function getConfirmedParticipations(companyId: number) {
  return participations.filter(
    (participation) =>
      participation.companyId === companyId &&
      participation.confirmed &&
      participation.frequencyControl === 1,
  );
}

export function getLastInteractionDate(companyId: number) {
  const dates = getConfirmedParticipations(companyId)
    .map((participation) => new Date(`${participation.date}T00:00:00`).getTime())
    .sort((a, b) => b - a);

  return dates[0] ? new Date(dates[0]) : null;
}

export function getDaysSinceLastInteraction(companyId: number) {
  const lastInteraction = getLastInteractionDate(companyId);
  if (!lastInteraction) {
    return null;
  }

  return Math.floor((CURRENT_DATE.getTime() - lastInteraction.getTime()) / 86400000);
}

export function calculateEngagementScore(companyId: number) {
  const confirmed = getConfirmedParticipations(companyId);
  const baseScore = confirmed.reduce(
    (total, participation) => total + scoreByLevel[participation.level],
    0,
  );
  const pillarBonus = new Set(
    confirmed.map((participation) => events.find((event) => event.id === participation.eventId)?.pillar),
  ).size * 4;
  const daysWithoutInteraction = getDaysSinceLastInteraction(companyId);
  const inactivityPenalty =
    daysWithoutInteraction === null ? 25 : daysWithoutInteraction > 90 ? 35 : daysWithoutInteraction > 60 ? 20 : daysWithoutInteraction > 30 ? 10 : 0;

  return Math.max(0, Math.min(100, baseScore + pillarBonus - inactivityPenalty));
}

export function getCategory(score: number): Category {
  if (score >= 90) return "Diamante";
  if (score >= 75) return "Ouro";
  if (score >= 50) return "Prata";
  return "Bronze";
}

export function getEngagementStatus(companyId: number): EngagementStatus {
  const daysWithoutInteraction = getDaysSinceLastInteraction(companyId);
  if (daysWithoutInteraction === null) return "Dados insuficientes";
  if (daysWithoutInteraction <= 30) return "Ativa";
  if (daysWithoutInteraction <= 90) return "Em Risco";
  return "Inativa";
}

export function getDataIssues(company: HubCompany) {
  const missing = [
    ["CNPJ", company.cnpj],
    ["razão social", company.legalName],
    ["e-mail", company.email],
    ["setor", company.sector],
    ["região", company.region],
  ].filter(([, value]) => !value);

  return missing.map(([label]) => `Campo obrigatório ausente: ${label}`);
}

export function getRecommendedAction(company: HubCompany) {
  const confirmedEventIds = new Set(getConfirmedParticipations(company.id).map((item) => item.eventId));
  const participatedInTraining = events.some(
    (event) => confirmedEventIds.has(event.id) && event.pillar === "Pilar I",
  );
  const participatedInAcceleration = events.some(
    (event) => confirmedEventIds.has(event.id) && event.pillar === "Pilar II",
  );
  const status = getEngagementStatus(company.id);

  if (status === "Inativa") {
    return "Criar tarefa de ligação de resgate e oferecer capacitação de reentrada.";
  }

  if (participatedInTraining && !participatedInAcceleration) {
    return "Oferecer programa do Pilar II - Solução e Transformação.";
  }

  if (company.companyType === "Startup" || company.sector.includes("Tecnologia")) {
    return "Convidar para ações de inovação aberta e networking com indústrias.";
  }

  return "Manter relacionamento ativo e indicar o próximo evento setorial disponível.";
}

export function getAutomaticDiagnosis(company: HubCompany) {
  const score = calculateEngagementScore(company.id);
  const category = getCategory(score);
  const status = getEngagementStatus(company.id);
  const days = getDaysSinceLastInteraction(company.id);
  const participationsCount = getConfirmedParticipations(company.id).length;
  const issues = getDataIssues(company);

  if (issues.length > 0) {
    return `Dados insuficientes para classificar ${company.name}. ${issues.join("; ")}. Solicite validação humana antes de gerar recomendações.`;
  }

  const recency = days === null ? "sem presença confirmada" : `há ${days} dias sem nova presença confirmada`;

  return `${company.name} está classificada como ${category}, com score ${score} e status ${status}. A empresa possui ${participationsCount} presença(s) confirmada(s) e está ${recency}. Próxima melhor ação: ${getRecommendedAction(company)}`;
}

export function getCompanySummary(company: HubCompany) {
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

export const companySummaries = companies.map(getCompanySummary);

export function getAlerts() {
  return companySummaries
    .filter((company) => company.status === "Em Risco" || company.status === "Inativa")
    .map((company) => ({
      company: company.name,
      status: company.status,
      score: company.score,
      description:
        company.status === "Inativa"
          ? `${company.name} não tem presença confirmada há mais de 90 dias.`
          : `${company.name} está há mais de 30 dias sem nova presença confirmada.`,
      action: company.recommendedAction,
    }));
}

export function getEngagementDistribution() {
  return ["Diamante", "Ouro", "Prata", "Bronze"].map((category) => ({
    name: category,
    value: companySummaries.filter((company) => company.category === category).length,
  }));
}

export function getCsvValidationRules() {
  return [
    "Aceitar somente arquivos .csv.",
    "CNPJ, razão social, e-mail, setor e região são campos obrigatórios.",
    "Antes de inserir, comparar CNPJ, razão social e e-mail para evitar duplicidade.",
    "Se o CNPJ já existir, atualizar o cadastro; se não existir, criar nova empresa.",
    "Recalcular score e categoria imediatamente após importação válida.",
    "Registrar importação e gerar log para cada linha rejeitada.",
  ];
}

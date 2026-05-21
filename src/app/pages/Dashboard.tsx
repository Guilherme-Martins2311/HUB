import {
  Building2,
  TrendingUp,
  Users,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Filter,
  Calendar,
  Map as MapIcon,
  Factory,
  Briefcase,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const kpiData = [
  {
    label: "Total de Empresas",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Building2,
  },
  {
    label: "Empresas Engajadas",
    value: "892",
    change: "+8%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Participações Totais",
    value: "3,456",
    change: "+23%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Taxa de Engajamento",
    value: "71.5%",
    change: "-2%",
    trend: "down",
    icon: BarChart3,
  },
];

const engagementByPillar = [
  { pillar: "Capacitação", value: 856 },
  { pillar: "Eventos", value: 645 },
  { pillar: "Programas", value: 523 },
  { pillar: "Conexões", value: 412 },
  { pillar: "Consultorias", value: 378 },
  { pillar: "Certificações", value: 342 },
];

const participationOverTime = [
  { month: "Jan", participacoes: 245 },
  { month: "Fev", participacoes: 289 },
  { month: "Mar", participacoes: 356 },
  { month: "Abr", participacoes: 398 },
  { month: "Mai", participacoes: 445 },
  { month: "Jun", participacoes: 512 },
];

const topCompanies = [
  { name: "Indústria ABC S.A.", score: 95, participation: 45 },
  { name: "Metalúrgica XYZ Ltda", score: 88, participation: 38 },
  { name: "Plásticos Moderna", score: 82, participation: 34 },
  { name: "Alimentos Premium", score: 78, participation: 31 },
  { name: "Têxtil Industrial", score: 75, participation: 29 },
];

const sectors = [
  "Metalúrgica",
  "Alimentos e Bebidas",
  "Química",
  "Têxtil",
  "Madeira e Mobiliário",
  "Plásticos",
  "Papel e Celulose",
  "Construção Civil",
];

const syndicates = [
  { name: "SINDIMETAL", sector: "Metalúrgica", companies: 245 },
  { name: "SINDIALPAR", sector: "Alimentos", companies: 198 },
  { name: "SINQUIPAR", sector: "Química", companies: 156 },
  { name: "SINDITÊXTIL", sector: "Têxtil", companies: 132 },
  { name: "SINDIMAD", sector: "Madeira", companies: 124 },
  { name: "SINDIPLAST", sector: "Plásticos", companies: 98 },
];

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Visão geral do engajamento empresarial
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Últimos 30 dias</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    kpi.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {kpi.trend === "up" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {kpi.change}
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-gray-800">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Factory className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Setores Atendidos
            </h3>
          </div>
          <p className="text-4xl font-bold text-gray-800 mb-4">{sectors.length}</p>
          <div className="space-y-2">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                <span>{sector}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Sindicatos Contemplados
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {syndicates.map((syndicate, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {syndicate.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {syndicate.sector}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {syndicate.companies}
                  </p>
                  <p className="text-xs text-gray-500">empresas</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Engajamento por Pilar
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementByPillar}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="pillar" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Participação ao Longo do Tempo
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={participationOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="participacoes"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Empresas Mais Engajadas
          </h3>
          <div className="space-y-4">
            {topCompanies.map((company, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-full text-blue-600 font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{company.name}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${company.score}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12">
                      {company.score}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Participações</p>
                  <p className="font-semibold text-gray-800">
                    {company.participation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Mapa de Localização
          </h3>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-[300px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M150 50 L200 80 L220 120 L190 150 L160 140 L140 100 Z"
                  fill="#3b82f6"
                  opacity="0.6"
                />
                <circle cx="180" cy="100" r="8" fill="#3b82f6" />
                <circle cx="250" cy="120" r="6" fill="#3b82f6" />
                <circle cx="200" cy="180" r="10" fill="#3b82f6" />
                <circle cx="140" cy="140" r="7" fill="#3b82f6" />
              </svg>
            </div>
            <div className="text-center z-10">
              <MapIcon className="w-16 h-16 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">
                Mapa Interativo de Empresas
              </p>
              <p className="text-sm text-gray-500 mt-1">
                1,247 empresas mapeadas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

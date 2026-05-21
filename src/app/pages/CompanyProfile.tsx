import { ArrowLeft, Mail, Phone, MapPin, Users, Calendar } from "lucide-react";
import { Link } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const engagementHistory = [
  { month: "Jan", score: 65 },
  { month: "Fev", score: 72 },
  { month: "Mar", score: 78 },
  { month: "Abr", score: 85 },
  { month: "Mai", score: 90 },
  { month: "Jun", score: 95 },
];

const participationHistory = [
  {
    date: "15 Mai 2026",
    event: "Workshop de Transformação Digital",
    type: "Capacitação",
  },
  {
    date: "08 Mai 2026",
    event: "Programa de Inovação Industrial 4.0",
    type: "Programa",
  },
  { date: "22 Abr 2026", event: "Feira Industrial do Paraná", type: "Evento" },
  {
    date: "10 Abr 2026",
    event: "Consultoria em Gestão de Processos",
    type: "Consultoria",
  },
  { date: "05 Mar 2026", event: "Certificação ISO 9001", type: "Certificação" },
];

const programs = [
  { name: "Indústria 4.0", status: "Ativo", progress: 75 },
  { name: "Gestão Ambiental", status: "Ativo", progress: 60 },
  { name: "Exportação", status: "Concluído", progress: 100 },
];

export function CompanyProfile() {
  return (
    <div className="p-8">
      <Link
        to="/empresas"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Empresas</span>
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">IA</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Indústria ABC S.A.
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                  Grande Porte
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full font-medium">
                  Ativo
                </span>
                <span>CNAE: 2511-0/00</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Score de Engajamento</p>
            <p className="text-4xl font-bold text-blue-600">95%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Responsável</p>
              <p className="font-medium text-gray-800">João Silva</p>
              <p className="text-sm text-gray-600">Diretor Executivo</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">E-mail</p>
              <p className="font-medium text-gray-800">
                contato@industriaabc.com.br
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium text-gray-800">(41) 3333-4444</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Localização</p>
              <p className="font-medium text-gray-800">Curitiba, PR</p>
              <p className="text-sm text-gray-600">Região Metropolitana</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Funcionários</p>
              <p className="font-medium text-gray-800">450 colaboradores</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cadastro</p>
              <p className="font-medium text-gray-800">Janeiro 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Evolução do Engajamento
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Programas Vinculados
          </h3>
          <div className="space-y-4">
            {programs.map((program, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-800">{program.name}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      program.status === "Ativo"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {program.status}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${program.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Histórico de Participação
          </h3>
          <div className="space-y-4">
            {participationHistory.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  {index < participationHistory.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                  <p className="font-medium text-gray-800">{item.event}</p>
                  <span className="inline-block mt-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Insights Inteligentes
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-800 mb-1">
                ⭐ Alta Performance
              </p>
              <p className="text-sm text-blue-600">
                Empresa está 23% acima da média de engajamento do setor
                metalúrgico
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-green-800 mb-1">
                📈 Crescimento Consistente
              </p>
              <p className="text-sm text-green-600">
                Score de engajamento cresceu 46% nos últimos 6 meses
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-sm font-medium text-purple-800 mb-1">
                🎯 Recomendação
              </p>
              <p className="text-sm text-purple-600">
                Empresa tem perfil ideal para participar do Programa de
                Exportação
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

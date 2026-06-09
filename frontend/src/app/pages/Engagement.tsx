import { useEffect, useState } from "react";
import { TrendingUp, Users, Target, Award } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { getEngagement } from "../api";

const kpiData = [
  { label: "Participações Totais", value: "3,456", icon: Users },
  { label: "Média de Engajamento", value: "71.5%", icon: TrendingUp },
  { label: "Empresas Ativas", value: "892", icon: Target },
  { label: "Certificações", value: "234", icon: Award },
];

const engagementBySector = [
  { sector: "Metalúrgica", engagement: 85, companies: 245 },
  { sector: "Alimentos", engagement: 78, companies: 198 },
  { sector: "Química", engagement: 72, companies: 156 },
  { sector: "Têxtil", engagement: 68, companies: 132 },
  { sector: "Madeira", engagement: 65, companies: 124 },
  { sector: "Plásticos", engagement: 62, companies: 98 },
];

const growthData = [
  { month: "Jan", crescimento: 5.2 },
  { month: "Fev", crescimento: 6.8 },
  { month: "Mar", crescimento: 8.1 },
  { month: "Abr", crescimento: 9.5 },
  { month: "Mai", crescimento: 11.2 },
  { month: "Jun", crescimento: 12.7 },
];

const participationByType = [
  { name: "Capacitação", value: 856, color: "#3b82f6" },
  { name: "Eventos", value: 645, color: "#8b5cf6" },
  { name: "Programas", value: 523, color: "#10b981" },
  { name: "Consultorias", value: 378, color: "#f59e0b" },
  { name: "Certificações", value: 342, color: "#ef4444" },
];

const topEngagement = [
  { company: "Indústria ABC S.A.", score: 95, sector: "Metalúrgica" },
  { company: "Metalúrgica XYZ", score: 88, sector: "Metalúrgica" },
  { company: "Plásticos Moderna", score: 82, sector: "Plásticos" },
  { company: "Alimentos Premium", score: 78, sector: "Alimentos" },
  { company: "Têxtil Industrial", score: 75, sector: "Têxtil" },
];

export function Engagement() {
  const [engagementData, setEngagementData] = useState<any>(null);

  useEffect(() => {
    let active = true;

    getEngagement()
      .then((data) => {
        if (active) {
          setEngagementData(data);
        }
      })
      .catch(() => {
        if (active) {
          setEngagementData(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const dashboardKpis = engagementData?.kpis
    ? kpiData.map((item, index) => ({
        ...item,
        ...engagementData.kpis[index],
      }))
    : kpiData;
  const dashboardEngagementBySector = engagementData?.engagementBySector ?? engagementBySector;
  const dashboardGrowthData = engagementData?.growthData ?? growthData;
  const dashboardParticipationByType = engagementData?.participationByType ?? participationByType;
  const dashboardTopEngagement = engagementData?.topEngagement ?? topEngagement;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Engajamento</h1>
        <p className="text-gray-500 mt-1">
          Análise detalhada de participação e engajamento empresarial
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {dashboardKpis.map((kpi: any, index: number) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-gray-800">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Engajamento por Setor
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardEngagementBySector} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis dataKey="sector" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="engagement" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Crescimento de Participação
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="crescimento"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Participação por Tipo
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dashboardParticipationByType}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {dashboardParticipationByType.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Ranking de Engajamento
          </h3>
          <div className="space-y-4">
            {dashboardTopEngagement.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-white ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-gray-400"
                      : index === 2
                      ? "bg-orange-600"
                      : "bg-blue-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.company}</p>
                  <p className="text-sm text-gray-500">{item.sector}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2 w-32">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-800 w-12 text-right">
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

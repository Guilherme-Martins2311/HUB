import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  FileSpreadsheet,
  FileBarChart,
  TrendingUp,
} from "lucide-react";

import { getReports } from "../api";

const reportTypes = [
  {
    title: "Relatório Executivo",
    description: "Visão geral estratégica com KPIs e indicadores principais",
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Análise de Engajamento",
    description: "Detalhamento completo de participação por empresa e setor",
    icon: TrendingUp,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Indicadores Regionais",
    description: "Distribuição geográfica e desempenho por território",
    icon: FileBarChart,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Exportação de Dados",
    description: "Base completa para análise em Excel ou Power BI",
    icon: FileSpreadsheet,
    color: "bg-orange-50 text-orange-600",
  },
];

const recentReports = [
  {
    name: "Relatório Mensal - Maio 2026",
    date: "10/05/2026",
    time: "14:30",
    type: "PDF",
    size: "2.4 MB",
  },
  {
    name: "Análise Trimestral Q1 2026",
    date: "01/04/2026",
    time: "09:15",
    type: "PDF",
    size: "5.1 MB",
  },
  {
    name: "Base de Dados - Empresas Ativas",
    date: "25/04/2026",
    time: "16:45",
    type: "XLSX",
    size: "1.8 MB",
  },
  {
    name: "Dashboard Power BI - Engajamento",
    date: "18/04/2026",
    time: "11:20",
    type: "PBIX",
    size: "3.2 MB",
  },
  {
    name: "Relatório Anual 2025",
    date: "15/01/2026",
    time: "10:00",
    type: "PDF",
    size: "8.7 MB",
  },
];

export function Reports() {
  const [reportsData, setReportsData] = useState<any>(null);

  useEffect(() => {
    let active = true;

    getReports()
      .then((data) => {
        if (active) {
          setReportsData(data);
        }
      })
      .catch(() => {
        if (active) {
          setReportsData(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const dashboardReportTypes = reportsData?.reportTypes ?? reportTypes;
  const dashboardRecentReports = reportsData?.recentReports ?? recentReports;
  const dashboardUsageStats = reportsData?.usageStats ?? [
    { value: 127, label: "Relatórios gerados", detail: "Últimos 30 dias", color: "blue" },
    { value: 45, label: "Exportações realizadas", detail: "Este mês", color: "green" },
    { value: 12, label: "Dashboards criados", detail: "Power BI", color: "purple" },
    { value: 3, label: "Agendamentos ativos", detail: "Automáticos", color: "orange" },
  ];
  const colorClasses: Record<string, string> = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>
        <p className="text-gray-500 mt-1">
          Geração e exportação de relatórios estratégicos
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {dashboardReportTypes.map((report: any, index: number) => {
          const Icon = report.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100">
                  <Download className="w-4 h-4" />
                  <span>Gerar</span>
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {report.title}
              </h3>
              <p className="text-sm text-gray-600">{report.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Histórico de Relatórios
          </h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <Calendar className="w-4 h-4" />
              <span>Filtrar</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {dashboardRecentReports.map((report: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{report.name}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.time}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded">
                      {report.type}
                    </span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Estatísticas de Uso
        </h3>
          <div className="grid grid-cols-4 gap-6">
          {dashboardUsageStats.map((stat: any, index: number) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className={`text-3xl font-bold mb-1 ${colorClasses[stat.color] ?? "text-gray-800"}`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

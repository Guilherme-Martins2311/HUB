import { Search, Filter, Download, Plus, Eye } from "lucide-react";
import { Link } from "react-router";

const companies = [
  {
    id: 1,
    name: "Indústria ABC S.A.",
    sector: "Metalúrgica",
    region: "Curitiba",
    size: "Grande",
    cnae: "2511-0/00",
    manager: "João Silva",
    engagement: 95,
    status: "Ativo",
  },
  {
    id: 2,
    name: "Metalúrgica XYZ Ltda",
    sector: "Metalúrgica",
    region: "Ponta Grossa",
    size: "Médio",
    cnae: "2512-8/00",
    manager: "Maria Santos",
    engagement: 88,
    status: "Ativo",
  },
  {
    id: 3,
    name: "Plásticos Moderna",
    sector: "Plásticos",
    region: "Londrina",
    size: "Médio",
    cnae: "2221-8/00",
    manager: "Carlos Oliveira",
    engagement: 82,
    status: "Ativo",
  },
  {
    id: 4,
    name: "Alimentos Premium",
    sector: "Alimentos",
    region: "Maringá",
    size: "Grande",
    cnae: "1011-2/01",
    manager: "Ana Costa",
    engagement: 78,
    status: "Ativo",
  },
  {
    id: 5,
    name: "Têxtil Industrial",
    sector: "Têxtil",
    region: "Cascavel",
    size: "Pequeno",
    cnae: "1311-1/00",
    manager: "Pedro Ferreira",
    engagement: 75,
    status: "Ativo",
  },
  {
    id: 6,
    name: "Madeireira Sul",
    sector: "Madeira",
    region: "Guarapuava",
    size: "Médio",
    cnae: "1610-2/01",
    manager: "Lucia Mendes",
    engagement: 68,
    status: "Ativo",
  },
  {
    id: 7,
    name: "Química Industrial PR",
    sector: "Química",
    region: "Curitiba",
    size: "Grande",
    cnae: "2011-8/00",
    manager: "Roberto Lima",
    engagement: 72,
    status: "Ativo",
  },
  {
    id: 8,
    name: "Móveis e Design",
    sector: "Móveis",
    region: "Arapongas",
    size: "Médio",
    cnae: "3101-2/00",
    manager: "Sandra Alves",
    engagement: 65,
    status: "Inativo",
  },
];

export function Companies() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Empresas</h1>
          <p className="text-gray-500 mt-1">
            Gerenciamento de empresas cadastradas
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nova Empresa</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar empresas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
              Todos
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              Grande Porte
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              Médio Porte
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              Pequeno Porte
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Setor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Região
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Porte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CNAE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsável
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engajamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {company.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {company.sector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {company.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {company.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {company.cnae}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {company.manager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 w-20">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${company.engagement}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {company.engagement}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        company.status === "Ativo"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/empresas/${company.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando 1 a 8 de 1,247 empresas
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
              Anterior
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

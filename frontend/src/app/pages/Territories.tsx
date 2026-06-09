import { Map as MapIcon, MapPin, TrendingUp, Building2 } from "lucide-react";

const regions = [
  {
    name: "Curitiba - Região Metropolitana",
    companies: 342,
    engagement: 78,
    color: "bg-blue-500",
  },
  { name: "Londrina", companies: 156, engagement: 72, color: "bg-purple-500" },
  { name: "Maringá", companies: 134, engagement: 68, color: "bg-green-500" },
  {
    name: "Ponta Grossa",
    companies: 98,
    engagement: 65,
    color: "bg-yellow-500",
  },
  { name: "Cascavel", companies: 87, engagement: 63, color: "bg-red-500" },
  { name: "Foz do Iguaçu", companies: 76, engagement: 61, color: "bg-pink-500" },
  {
    name: "Guarapuava",
    companies: 65,
    engagement: 58,
    color: "bg-indigo-500",
  },
  { name: "Arapongas", companies: 54, engagement: 55, color: "bg-cyan-500" },
];

const topCities = [
  { city: "Curitiba", companies: 342, growth: "+15%" },
  { city: "Londrina", companies: 156, growth: "+12%" },
  { city: "Maringá", companies: 134, growth: "+8%" },
  { city: "Ponta Grossa", companies: 98, growth: "+6%" },
  { city: "Cascavel", companies: 87, growth: "+5%" },
];

export function Territories() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Territórios</h1>
        <p className="text-gray-500 mt-1">
          Distribuição geográfica e análise regional
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Regiões Ativas</p>
          <p className="text-3xl font-bold text-gray-800">8</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Empresas Mapeadas</p>
          <p className="text-3xl font-bold text-gray-800">1,247</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Região Líder</p>
          <p className="text-3xl font-bold text-gray-800">CWB</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <MapIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Cobertura</p>
          <p className="text-3xl font-bold text-gray-800">85%</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Mapa Interativo do Paraná
          </h3>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 600 500"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M200 150 L250 120 L320 140 L380 170 L400 230 L380 290 L320 330 L250 340 L180 310 L160 250 Z"
                  fill="#3b82f6"
                  opacity="0.3"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />

                <circle cx="300" cy="200" r="20" fill="#3b82f6">
                  <animate
                    attributeName="r"
                    from="15"
                    to="25"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="300"
                  y="205"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  342
                </text>

                <circle cx="380" cy="240" r="15" fill="#8b5cf6">
                  <animate
                    attributeName="r"
                    from="12"
                    to="18"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="380"
                  y="244"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  156
                </text>

                <circle cx="400" cy="190" r="13" fill="#10b981">
                  <animate
                    attributeName="r"
                    from="10"
                    to="16"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="400"
                  y="194"
                  textAnchor="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="bold"
                >
                  134
                </text>

                <circle cx="320" cy="260" r="12" fill="#f59e0b" />
                <text
                  x="320"
                  y="264"
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                >
                  98
                </text>

                <circle cx="220" cy="280" r="11" fill="#ef4444" />
                <text
                  x="220"
                  y="284"
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                >
                  87
                </text>

                <circle cx="180" cy="340" r="10" fill="#ec4899" />
                <text
                  x="180"
                  y="344"
                  textAnchor="middle"
                  fill="white"
                  fontSize="7"
                  fontWeight="bold"
                >
                  76
                </text>

                <circle cx="260" cy="300" r="10" fill="#6366f1" />
                <text
                  x="260"
                  y="304"
                  textAnchor="middle"
                  fill="white"
                  fontSize="7"
                  fontWeight="bold"
                >
                  65
                </text>

                <circle cx="350" cy="300" r="9" fill="#06b6d4" />
                <text
                  x="350"
                  y="304"
                  textAnchor="middle"
                  fill="white"
                  fontSize="7"
                  fontWeight="bold"
                >
                  54
                </text>
              </svg>
            </div>

            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
              <p className="text-xs font-medium text-gray-600 mb-2">Legenda</p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>Curitiba - 342 empresas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Cidades
          </h3>
          <div className="space-y-4">
            {topCities.map((city, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{city.city}</p>
                    <p className="text-xs text-gray-500">
                      {city.companies} empresas
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {city.growth}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              Distribuição por Porte
            </h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Grande Porte</span>
                  <span className="font-medium text-gray-800">35%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-[35%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Médio Porte</span>
                  <span className="font-medium text-gray-800">45%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Pequeno Porte</span>
                  <span className="font-medium text-gray-800">20%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-[20%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Indicadores Regionais
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {regions.map((region, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 ${region.color} rounded-full`} />
                <p className="font-medium text-gray-800 text-sm">
                  {region.name}
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Empresas</p>
                  <p className="text-xl font-bold text-gray-800">
                    {region.companies}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Engajamento</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className={`${region.color} h-2 rounded-full`}
                        style={{ width: `${region.engagement}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {region.engagement}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

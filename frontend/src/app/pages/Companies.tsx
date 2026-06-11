import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Download, Plus, Eye, X, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";

import { createCompany, deleteCompany as deleteCompanyRequest, getCompanies, updateCompany } from "../api";

const fallbackCompanies = [
  {
    id: 1,
    name: "Indústria ABC S.A.",
    legalName: "Indústria ABC S.A.",
    sector: "Metalurgia",
    region: "Curitiba",
    size: "Grande empresa",
    cnae: "2511-0/00",
    manager: "João Silva",
    score: 95,
    status: "Ativa",
  },
  {
    id: 2,
    name: "Metalúrgica XYZ Ltda",
    legalName: "Metalúrgica XYZ Ltda",
    sector: "Metalurgia",
    region: "Ponta Grossa",
    size: "Média empresa",
    cnae: "2512-8/00",
    manager: "Maria Santos",
    score: 88,
    status: "Ativa",
  },
  {
    id: 3,
    name: "Plásticos Moderna",
    legalName: "Plásticos Moderna",
    sector: "Plásticos",
    region: "Londrina",
    size: "Média empresa",
    cnae: "2221-8/00",
    manager: "Carlos Oliveira",
    score: 82,
    status: "Ativa",
  },
  {
    id: 4,
    name: "Alimentos Premium",
    legalName: "Alimentos Premium",
    sector: "Alimentos",
    region: "Maringá",
    size: "Grande empresa",
    cnae: "1011-2/01",
    manager: "Ana Costa",
    score: 78,
    status: "Ativa",
  },
  {
    id: 5,
    name: "Têxtil Industrial",
    legalName: "Têxtil Industrial",
    sector: "Têxtil",
    region: "Cascavel",
    size: "Pequena empresa",
    cnae: "1311-1/00",
    manager: "Pedro Ferreira",
    score: 75,
    status: "Ativa",
  },
  {
    id: 6,
    name: "Madeireira Sul",
    legalName: "Madeireira Sul",
    sector: "Madeira",
    region: "Guarapuava",
    size: "Média empresa",
    cnae: "1610-2/01",
    manager: "Lucia Mendes",
    score: 68,
    status: "Ativa",
  },
  {
    id: 7,
    name: "Química Industrial PR",
    legalName: "Química Industrial PR",
    sector: "Química",
    region: "Curitiba",
    size: "Grande empresa",
    cnae: "2011-8/00",
    manager: "Roberto Lima",
    score: 72,
    status: "Ativa",
  },
  {
    id: 8,
    name: "Móveis e Design",
    legalName: "Móveis e Design",
    sector: "Móveis",
    region: "Arapongas",
    size: "Média empresa",
    cnae: "3101-2/00",
    manager: "Sandra Alves",
    score: 65,
    status: "Inativa",
  },
];

const initialForm = {
  name: "",
  legalName: "",
  cnpj: "",
  cep: "",
  cnae: "",
  address: "",
  region: "",
  contact: "",
  manager: "",
  phone: "",
  email: "",
  sector: "",
  size: "Pequena empresa",
  companyType: "Industria",
  employees: "",
  ledByWoman: false,
  unionMember: false,
  maturity: "Inicial",
  registeredAt: new Date().toISOString().slice(0, 10),
};

export function Companies() {
  const [companiesData, setCompaniesData] = useState<any[]>([]);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterDraft, setFilterDraft] = useState({
    sector: "",
    region: "",
    status: "",
    size: "",
  });
  const [filters, setFilters] = useState(filterDraft);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [createOpen, setCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState("");
  const [editingCompanyId, setEditingCompanyId] = useState<number | string | null>(null);
  const [deletingCompanyId, setDeletingCompanyId] = useState<number | string | null>(null);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    let active = true;

    setLoading(true);
    getCompanies()
      .then((data) => {
        if (active && Array.isArray(data)) {
          setCompaniesData(data);
          setLoadError("");
        }
      })
      .catch((error) => {
        if (active) {
          setCompaniesData([]);
          setLoadError(error instanceof Error ? error.message : "Falha ao carregar empresas");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  useEffect(() => {
    if (filtersOpen) {
      setFilterDraft(filters);
    }
  }, [filters, filtersOpen]);

  const availableFilters = useMemo(() => {
    const sectors = Array.from(new Set(companiesData.map((company) => company.sector).filter(Boolean))).sort();
    const regions = Array.from(new Set(companiesData.map((company) => company.region).filter(Boolean))).sort();
    const statuses = Array.from(new Set(companiesData.map((company) => company.status).filter(Boolean))).sort();
    const sizes = Array.from(new Set(companiesData.map((company) => company.size).filter(Boolean))).sort();

    return { sectors, regions, statuses, sizes };
  }, [companiesData]);

  const filteredCompanies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return companiesData.filter((company) => {
      const matchesSearch =
        !normalizedSearch ||
        [company.name, company.legalName, company.sector, company.region, company.manager, company.cnae]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch));

      const matchesSector = !filters.sector || company.sector === filters.sector;
      const matchesRegion = !filters.region || company.region === filters.region;
      const matchesStatus = !filters.status || company.status === filters.status;
      const matchesSize = !filters.size || company.size === filters.size;

      return matchesSearch && matchesSector && matchesRegion && matchesStatus && matchesSize;
    });
  }, [companiesData, filters, search]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
    }
  }, [currentPage, safePage]);

  const paginatedCompanies = filteredCompanies.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleApplyFilters = () => {
    setFilters(filterDraft);
    setFiltersOpen(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = { sector: "", region: "", status: "", size: "" };
    setFilterDraft(emptyFilters);
    setFilters(emptyFilters);
    setFiltersOpen(false);
  };

  const refreshCompanies = async () => {
    const refreshed = await getCompanies();
    if (Array.isArray(refreshed)) {
      setCompaniesData(refreshed);
    }
  };

  const buildFormFromCompany = (company: any) => ({
    name: company.name ?? "",
    legalName: company.legalName ?? "",
    cnpj: company.cnpj ?? "",
    cep: company.cep ?? "",
    cnae: company.cnae ?? "",
    address: company.address ?? "",
    region: company.region ?? "",
    contact: company.contact ?? "",
    manager: company.manager ?? "",
    phone: company.phone ?? "",
    email: company.email ?? "",
    sector: company.sector ?? "",
    size: company.size ?? "Pequena empresa",
    companyType: company.companyType ?? "Industria",
    employees: String(company.employees ?? ""),
    ledByWoman: Boolean(company.ledByWoman),
    unionMember: Boolean(company.unionMember),
    maturity: company.maturity ?? "Inicial",
    registeredAt: company.registeredAt ? String(company.registeredAt).slice(0, 10) : new Date().toISOString().slice(0, 10),
  });

  const handleOpenCreate = () => {
    setEditingCompanyId(null);
    setFormData(initialForm);
    setCreateError("");
    setCreateOpen(true);
  };

  const handleOpenEdit = (company: any) => {
    setEditingCompanyId(company.id);
    setFormData(buildFormFromCompany(company));
    setCreateError("");
    setCreateOpen(true);
  };

  const handleCloseModal = () => {
    setCreateOpen(false);
    setEditingCompanyId(null);
    setFormData(initialForm);
    setCreateError("");
  };

  const handleSubmitCompany = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setCreateError("");

    try {
      const payload = {
        ...formData,
        employees: Number(formData.employees || 0),
        ledByWoman: Boolean(formData.ledByWoman),
        unionMember: Boolean(formData.unionMember),
      };

      if (editingCompanyId) {
        await updateCompany(editingCompanyId, payload);
      } else {
        await createCompany(payload);
      }

      await refreshCompanies();
      handleCloseModal();
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Erro ao salvar empresa");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCompany = async (company: any) => {
    const confirmed = window.confirm(`Excluir a empresa "${company.name}"? Esta acao nao pode ser desfeita.`);
    if (!confirmed) return;

    setDeletingCompanyId(company.id);
    try {
      await deleteCompanyRequest(company.id);
      await refreshCompanies();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Erro ao excluir empresa");
    } finally {
      setDeletingCompanyId(null);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  const startItem = filteredCompanies.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = Math.min(safePage * pageSize, filteredCompanies.length);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Empresas</h1>
          <p className="text-gray-500 mt-1">
            Gerenciamento de empresas cadastradas
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
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
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen((current) => !current)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                filtersOpen || Object.values(filters).some(Boolean)
                  ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {loadError && (
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                API indisponivel
              </span>
            )}
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
              {filteredCompanies.length} empresa(s)
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {availableFilters.sizes.length} portes
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {availableFilters.sectors.length} setores
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {availableFilters.regions.length} regiões
            </span>
          </div>

          {filtersOpen && (
            <div className="mt-4 grid gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Setor
                <select
                  value={filterDraft.sector}
                  onChange={(event) => setFilterDraft((current) => ({ ...current, sector: event.target.value }))}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  {availableFilters.sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Região
                <select
                  value={filterDraft.region}
                  onChange={(event) => setFilterDraft((current) => ({ ...current, region: event.target.value }))}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                >
                  <option value="">Todas</option>
                  {availableFilters.regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Status
                <select
                  value={filterDraft.status}
                  onChange={(event) => setFilterDraft((current) => ({ ...current, status: event.target.value }))}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  {availableFilters.statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Porte
                <select
                  value={filterDraft.size}
                  onChange={(event) => setFilterDraft((current) => ({ ...current, size: event.target.value }))}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  {availableFilters.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>

              <div className="md:col-span-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Aplicar filtros
                </button>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          )}
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
              {!loading && paginatedCompanies.map((company) => (
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
                          style={{ width: `${company.score ?? company.engagement ?? 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {company.score ?? company.engagement ?? 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        company.status === "Ativa" || company.status === "Ativo"
                          ? "bg-green-50 text-green-600"
                          : company.status === "Em Risco"
                            ? "bg-amber-50 text-amber-600"
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
              {!loading && paginatedCompanies.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-sm text-gray-500">
                    Nenhuma empresa encontrada com os filtros atuais.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-sm text-gray-500">
                    Carregando empresas...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {startItem} a {endItem} de {filteredCompanies.length} empresas
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded">
              {currentPage}
            </span>
            <span className="px-3 py-1 border border-gray-200 rounded text-gray-600">
              de {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Cadastrar nova empresa</h2>
                <p className="text-sm text-gray-500">Os dados serão gravados na API e refletidos na listagem.</p>
              </div>
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {createError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {createError}
              </div>
            )}

            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateCompany}>
              {[
                ["name", "Nome fantasia"],
                ["legalName", "Razão social"],
                ["cnpj", "CNPJ"],
                ["cep", "CEP"],
                ["cnae", "CNAE"],
                ["address", "Endereço"],
                ["region", "Região"],
                ["contact", "Contato"],
                ["manager", "Responsável"],
                ["phone", "Telefone"],
                ["email", "E-mail"],
                ["sector", "Setor"],
              ].map(([key, label]) => (
                <label key={key} className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  {label}
                  <input
                    type="text"
                    value={String(formData[key as keyof typeof formData] ?? "")}
                    onChange={(event) => setFormData((current) => ({ ...current, [key]: event.target.value }))}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                    required={key !== "contact"}
                  />
                </label>
              ))}

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Porte
                <select
                  value={formData.size}
                  onChange={(event) => setFormData((current) => ({ ...current, size: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                >
                  <option value="Microempresa">Microempresa</option>
                  <option value="Pequena empresa">Pequena empresa</option>
                  <option value="Média empresa">Média empresa</option>
                  <option value="Grande empresa">Grande empresa</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Tipo de empresa
                <select
                  value={formData.companyType}
                  onChange={(event) => setFormData((current) => ({ ...current, companyType: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                >
                  <option value="Industria">Indústria</option>
                  <option value="Startup">Startup</option>
                  <option value="Governo">Governo</option>
                  <option value="Academia">Academia</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Funcionários
                <input
                  type="number"
                  min="0"
                  value={formData.employees}
                  onChange={(event) => setFormData((current) => ({ ...current, employees: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Maturidade
                <select
                  value={formData.maturity}
                  onChange={(event) => setFormData((current) => ({ ...current, maturity: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                >
                  <option value="Inicial">Inicial</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.ledByWoman}
                  onChange={(event) => setFormData((current) => ({ ...current, ledByWoman: event.target.checked }))}
                  className="rounded"
                />
                Liderada por mulher
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.unionMember}
                  onChange={(event) => setFormData((current) => ({ ...current, unionMember: event.target.checked }))}
                  className="rounded"
                />
                Empresa associada ao sindicato
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 md:col-span-2">
                Data de cadastro
                <input
                  type="date"
                  value={formData.registeredAt}
                  onChange={(event) => setFormData((current) => ({ ...current, registeredAt: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                />
              </label>

              <div className="md:col-span-2 mt-2 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Salvando..." : "Cadastrar empresa"}
                </button>
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

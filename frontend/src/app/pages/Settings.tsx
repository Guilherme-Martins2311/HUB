import { useEffect, useMemo, useState } from "react";
import {
  Settings as SettingsIcon,
  Users,
  Shield,
  Bell,
  Key,
  Mail,
  X,
} from "lucide-react";

import { createUser, getSettings, updateSetting } from "../api";

const users = [
  { name: "Admin User", email: "admin@fiep.com.br", role: "Gestor" },
  { name: "João Silva", email: "joao.silva@fiep.com.br", role: "Analista" },
  { name: "Maria Santos", email: "maria.santos@fiep.com.br", role: "Analista" },
  { name: "Carlos Oliveira", email: "carlos@fiep.com.br", role: "Consultor" },
];

const notificationDefaults = [
  { key: "dailyEmail", label: "E-mail diário", enabled: true },
  { key: "engagementAlerts", label: "Alertas de engajamento", enabled: true },
  { key: "weeklyReports", label: "Relatórios semanais", enabled: false },
];

const userFormInitialState = {
  name: "",
  email: "",
  password: "",
  role: "Analista",
};

export function Settings() {
  const [settingsData, setSettingsData] = useState<any>(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [userForm, setUserForm] = useState(userFormInitialState);
  const [savingUser, setSavingUser] = useState(false);
  const [savingNotificationKey, setSavingNotificationKey] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getSettings()
      .then((data) => {
        if (active) {
          setSettingsData(data);
        }
      })
      .catch(() => {
        if (active) {
          setSettingsData(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const dashboardUsers = settingsData?.users ?? users;
  const dashboardNotifications = useMemo(() => {
    const apiNotifications = Array.isArray(settingsData?.notifications) ? settingsData.notifications : [];

    return notificationDefaults.map((notification) => {
      const match = apiNotifications.find((item: any) => item.key === notification.key || item.label === notification.label);
      return {
        ...notification,
        enabled: typeof match?.enabled === "boolean" ? match.enabled : notification.enabled,
      };
    });
  }, [settingsData]);

  const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingUser(true);

    try {
      await createUser({
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        role: userForm.role,
        position: userForm.role,
      });
      const refreshed = await getSettings();
      setSettingsData(refreshed);
      setUserForm(userFormInitialState);
      setCreateUserOpen(false);
    } finally {
      setSavingUser(false);
    }
  };

  const handleToggleNotification = async (key: string) => {
    const nextNotifications = dashboardNotifications.map((notification) =>
      notification.key === key ? { ...notification, enabled: !notification.enabled } : notification,
    );

    setSavingNotificationKey(key);
    try {
      await updateSetting("notifications", nextNotifications);
      const refreshed = await getSettings();
      setSettingsData(refreshed);
    } finally {
      setSavingNotificationKey(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
        <p className="text-gray-500 mt-1">
          Gerencie integrações, usuários e preferências do sistema
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Notificações</h3>
        </div>
        <div className="space-y-2">
          {dashboardNotifications.map((notification: any) => (
            <button
              key={notification.key}
              type="button"
              onClick={() => handleToggleNotification(notification.key)}
              disabled={savingNotificationKey === notification.key}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                notification.enabled
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <span>{notification.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  notification.enabled ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {savingNotificationKey === notification.key ? "Salvando..." : notification.enabled ? "Ativa" : "Inativa"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Gestão de Usuários
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setCreateUserOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Adicionar Usuário
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  E-mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Função
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboardUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Segurança</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Key className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Alterar Senha</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  Autenticação 2FA
                </span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Suporte</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-1">E-mail de Suporte</p>
              <p className="text-sm font-medium text-gray-800">
                suporte@crmindstrial.com.br
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-1">Versão do Sistema</p>
              <p className="text-sm font-medium text-gray-800">v2.5.1</p>
            </div>
          </div>
        </div>
      </div>

      {createUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Adicionar usuário</h2>
                <p className="text-sm text-gray-500">O novo usuário será salvo nas configurações da API.</p>
              </div>
              <button
                type="button"
                onClick={() => setCreateUserOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="grid gap-4" onSubmit={handleAddUser}>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Nome
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(event) => setUserForm((current) => ({ ...current, name: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                E-mail
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Senha
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(event) => setUserForm((current) => ({ ...current, password: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Função
                <select
                  value={userForm.role}
                  onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                >
                  <option value="Gestor">Gestor</option>
                  <option value="Analista">Analista</option>
                  <option value="Consultor">Consultor</option>
                  <option value="Diretor">Diretor</option>
                </select>
              </label>

              <div className="mt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={savingUser}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingUser ? "Salvando..." : "Adicionar usuário"}
                </button>
                <button
                  type="button"
                  onClick={() => setCreateUserOpen(false)}
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


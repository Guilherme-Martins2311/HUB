const API_BASE = import.meta.env.VITE_API_URL ?? '';

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `Falha ao carregar ${path}`);
  }

  return response.json() as Promise<T>;
}

export function getDashboard(params?: Record<string, string | undefined>) {
  const query = params
    ? new URLSearchParams(
        Object.entries(params).filter(([, value]) => Boolean(value)) as Array<[string, string]>,
      ).toString()
    : '';

  return requestJson(`/api/dashboard${query ? `?${query}` : ''}`);
}

export function getCompanies() {
  return requestJson('/api/companies');
}

export function createCompany(payload: Record<string, unknown>) {
  return requestJson('/api/companies', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getCompanyProfile(id: string | number) {
  return requestJson(`/api/companies/${id}/profile`);
}

export function getEngagement() {
  return requestJson('/api/engagement');
}

export function getReports() {
  return requestJson('/api/reports');
}

export function getSettings() {
  return requestJson('/api/settings');
}

export function updateSetting(key: string, value: unknown) {
  return requestJson(`/api/settings/${key}`, {
    method: 'PUT',
    body: JSON.stringify({ value }),
  });
}
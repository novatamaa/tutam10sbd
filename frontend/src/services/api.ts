const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  body?: Record<string, any>;
}

export async function apiCall(
  endpoint: string,
  options: RequestOptions = {}
) {
  const { body, ...restOptions } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...restOptions.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Account API
export const accountAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    apiCall('/accounts/register', {
      method: 'POST',
      body: data,
    }),

  login: (email: string, password: string) =>
    apiCall('/accounts/login', {
      method: 'POST',
      body: { email, password },
    }),

  getAll: () =>
    apiCall('/accounts', { method: 'GET' }),

  getById: (id: string) =>
    apiCall(`/accounts/${id}`, { method: 'GET' }),

  update: (id: string, data: Record<string, any>) =>
    apiCall(`/accounts/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id: string) =>
    apiCall(`/accounts/${id}`, { method: 'DELETE' }),
};

// Notes API
export const notesAPI = {
  getAll: () =>
    apiCall('/notes', { method: 'GET' }),

  getById: (id: string) =>
    apiCall(`/notes/${id}`, { method: 'GET' }),

  create: (data: Record<string, any>) =>
    apiCall('/notes', {
      method: 'POST',
      body: data,
    }),

  update: (id: string, data: Record<string, any>) =>
    apiCall(`/notes/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id: string) =>
    apiCall(`/notes/${id}`, { method: 'DELETE' }),
};

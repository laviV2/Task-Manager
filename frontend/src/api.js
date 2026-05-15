const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'API request failed');
  }

  return data;
};

// Auth
export const signup = (name, email, password, role) =>
  api('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role }),
  });

export const login = (email, password) =>
  api('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getMe = () => api('/api/auth/me');

// Projects
export const getProjects = () => api('/api/projects');

export const getUsers = () => api('/api/users');

export const deleteProject = (projectId) =>
  api(`/api/projects/${projectId}`, { method: 'DELETE' });

export const updateProjectReport = (projectId, progressStatus, report) =>
  api(`/api/projects/${projectId}/report`, {
    method: 'PATCH',
    body: JSON.stringify({ progressStatus, report }),
  });

// Attendance
export const getTodayAttendance = () => api('/api/attendance/today');

export const punchIn = () =>
  api('/api/attendance/punch-in', { method: 'POST' });

export const punchOut = () =>
  api('/api/attendance/punch-out', { method: 'POST' });

export const getAttendance = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api(`/api/attendance${query ? '?' + query : ''}`);
};

// Dashboard
export const getDashboard = () => api('/api/dashboard');

// Notifications
export const getNotifications = () => api('/api/notifications');

export const markAllNotificationsAsRead = () =>
  api('/api/notifications/read-all', { method: 'PATCH' });

// src/services/api.js
import axios from 'axios';

// Prefer env base URL, fallback to current hardcoded value
const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'https://nelblue.onrender.com/api';

// Central axios instance
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Helper to read token (update keys as needed)
function getToken() {
  return (
    localStorage.getItem('accessToken') ||
    localStorage.getItem('token') ||
    localStorage.getItem('jwt') ||
    null
  );
}

function setToken(token) {
  if (!token) return;
  localStorage.setItem('accessToken', token);
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function clearTokens() {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('jwt');
  } catch (_) {}
  delete API.defaults.headers.common.Authorization;
}

export async function logout() {
  try {
    await API.post('/auth/logout');
  } catch (_) {
    // ignore network/server errors during logout
  } finally {
    clearTokens();
  }
}

// Request interceptor to attach JWT if present
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with refresh flow
let isRefreshing = false;
let pendingRequests = [];

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    const status = error?.response?.status;
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/refreshtoken');

    if (status === 401 && !originalRequest?._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API.request(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      try {
        const { data } = await API.post('/auth/refreshtoken');
        const newToken = data?.accessToken || data?.token || data?.jwt || null;
        if (!newToken) {
          throw new Error('No token returned from refresh');
        }
        setToken(newToken);

        // Resolve queued requests
        pendingRequests.forEach(({ resolve }) => resolve(newToken));
        pendingRequests = [];

        // Retry original request with new token
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API.request(originalRequest);
      } catch (refreshErr) {
        pendingRequests.forEach(({ reject }) => reject(refreshErr));
        pendingRequests = [];
        await logout();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;

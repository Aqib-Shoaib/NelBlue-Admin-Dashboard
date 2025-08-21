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

// Optional: response interceptor (e.g., refresh token handling placeholder)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // You can add 401 handling / refresh flow here later
    return Promise.reject(error);
  }
);

export default API;

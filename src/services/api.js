// src/services/api.js
import axios from 'axios';

// Prefer env base URL, fallback to current hardcoded value
const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'https://nelblue.onrender.com/api';

// Central axios instance
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Token management
function getToken(type = 'access') {
  return localStorage.getItem(`${type}Token`) || null;
}

function setTokens(tokens) {
  if (!tokens) return;

  if (tokens.accessToken) {
    localStorage.setItem('accessToken', tokens.accessToken);
    API.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
  }

  if (tokens.refreshToken) {
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }
}

function clearTokens() {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete API.defaults.headers.common.Authorization;
  } catch (err) {
    console.log(err);
  }
}

// Check if token is expired (JWT tokens)
function isTokenExpired(token) {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    // Consider token expired if it expires within the next 5 minutes
    return payload.exp < (currentTime + 300);
  } catch (error) {
    console.log('Error parsing token:', error);
    return true;
  }
}

// Check if we need to refresh the token
function shouldRefreshToken() {
  const accessToken = getToken('access');
  const refreshToken = getToken('refresh');
  
  if (!accessToken || !refreshToken) return false;
  
  return isTokenExpired(accessToken);
}

// Add request interceptor to automatically add token and check expiration
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    // Check if token is expired before making request
    if (token && isTokenExpired(token)) {
      console.log('Token expired, attempting refresh before request...');
      // This will trigger the response interceptor to handle the 401
      // For now, we'll let the request go through and handle it in response
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiry and refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt token refresh for 401 errors and if we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getToken('refresh');
        if (!refreshToken) {
          console.log('No refresh token available, redirecting to login');
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        console.log('Attempting token refresh...');
        
        // Create a new axios instance for refresh to avoid circular dependency
        const refreshAxios = axios.create({
          baseURL: BASE_URL,
          withCredentials: true,
        });
        
        const response = await refreshAxios.post('/auth/refreshtoken', { 
          refreshToken: refreshToken 
        });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        if (accessToken) {
          console.log('Token refresh successful');
          setTokens({ accessToken, refreshToken: newRefreshToken });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return API(originalRequest);
        } else {
          throw new Error('No access token in refresh response');
        }
      } catch (refreshError) {
        console.log('Token refresh failed:', refreshError);
        clearTokens();
        // Only redirect if we're not already on the login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // For other errors, just pass them through
    return Promise.reject(error);
  }
);

// Export the API instance and token functions
API.getToken = getToken;
API.setTokens = setTokens;
API.clearTokens = clearTokens;
API.isTokenExpired = isTokenExpired;
API.shouldRefreshToken = shouldRefreshToken;

export default API;
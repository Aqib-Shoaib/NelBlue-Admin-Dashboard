// src/store/useAuth.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as authService from '../services/authService';
import { normalize } from './helpers';

// Custom hook for token management
export function useTokenManager() {
  const checkTokens = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  };

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const setTokens = (tokens) => {
    if (tokens.accessToken) {
      localStorage.setItem('accessToken', tokens.accessToken);
    }
    if (tokens.refreshToken) {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  };

  return { checkTokens, clearTokens, setTokens };
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return null;
      return normalize(await authService.getProfile());
    },
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => normalize(await authService.login(payload)),
    onSuccess: (data) => {
      console.log(data)
      // Store tokens in localStorage immediately
      if (data?.data?.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
        if (data.data.refreshToken) {
          localStorage.setItem('refreshToken', data.data.refreshToken);
        }
      }
      // Pre-populate the profile query with the login response data
      queryClient.setQueryData(['profile'], data);
      // Invalidate to ensure fresh data is fetched
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  const logout = () => {
    // Clear all tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Clear all queries from cache
    queryClient.clear();
    
    // Redirect to login
    window.location.href = '/login';
  };
  
  return { logout };
}

export function useSignupInitiate() {
  return useMutation({
    mutationFn: async (payload) => normalize(await authService.signupInitiate(payload)),
    onSuccess: (_data, variables) => {
      // persist email for OTP step
      if (variables?.email) {
        try { localStorage.setItem('signupEmail', variables.email); } catch (err) {
          console.log(err);
        }
      }
    },
  });
}

export function useSignupVerify() {
  return useMutation({
    mutationFn: async (payload) => normalize(await authService.signupVerify(payload)),
    onSuccess: () => {
      // clear email after successful verification
      try { localStorage.removeItem('signupEmail'); } catch (err) {
        console.log(err);
      }
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: async (payload) => normalize(await authService.resendOtp(payload)),
    onSuccess: () => {
      // no-op: page already shows inline feedback
    },
  });
}

export function useGetAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => normalize(await authService.getAllUsers()),
    onSuccess: () => {
      // keep for symmetry; UI handles display
    },
  });
}

export function useGetProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => normalize(await authService.getProfile()),
    onSuccess: () => {
      // could cache minimal profile if desired
    },
  });
}

// Set up periodic token refresh to prevent tokens from expiring
if (typeof window !== 'undefined') {
  const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes (refresh before 15 min expiry)
  let refreshIntervalId = null;

  const refreshTokenPeriodically = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!accessToken || !refreshToken) {
      console.log('No tokens available for refresh');
      return;
    }

    try {
      console.log('Attempting periodic token refresh...');
      const response = await authService.refreshToken({ refreshToken });
      
      if (response?.success && response?.data?.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        console.log('Periodic token refresh successful');
      } else {
        console.error('Periodic token refresh failed: Invalid response');
        clearTokens();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Error during periodic token refresh:', error);
      // Don't clear tokens on network errors, only on auth errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        clearTokens();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
  };

  // Start periodic refresh
  const startTokenRefresh = () => {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }
    refreshIntervalId = setInterval(refreshTokenPeriodically, TOKEN_REFRESH_INTERVAL);
    console.log('Token refresh interval started');
  };

  // Stop periodic refresh
  const stopTokenRefresh = () => {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      refreshIntervalId = null;
      console.log('Token refresh interval stopped');
    }
  };

  // Refresh token when user becomes active after being idle
  let lastActivity = Date.now();
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  
  const handleUserActivity = () => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivity;
    
    // If user was idle for more than 5 minutes, refresh token
    if (timeSinceLastActivity > 5 * 60 * 1000) {
      refreshTokenPeriodically();
    }
    
    lastActivity = now;
  };
  
  activityEvents.forEach(event => {
    document.addEventListener(event, handleUserActivity, true);
  });
  
  // Start token refresh when tokens are available
  const checkAndStartRefresh = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (accessToken && refreshToken) {
      startTokenRefresh();
    } else {
      stopTokenRefresh();
    }
  };

  // Check on page load
  checkAndStartRefresh();
  
  // Listen for storage changes (when tokens are added/removed)
  window.addEventListener('storage', checkAndStartRefresh);
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', stopTokenRefresh);
}

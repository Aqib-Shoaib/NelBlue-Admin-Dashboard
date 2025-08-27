// src/store/useAuth.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as authService from '../services/authService';
import { normalize } from './helpers';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return null;
      return normalize(await authService.getProfile());
    },
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
  const TOKEN_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

  const refreshTokenPeriodically = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await authService.refreshToken();
        if (response?.data?.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          console.log('Token refreshed successfully.');
        } else {
          console.error('Failed to refresh token.');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
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
  
  // Set up periodic token refresh every 10 minutes
  setInterval(refreshTokenPeriodically, TOKEN_REFRESH_INTERVAL);
}

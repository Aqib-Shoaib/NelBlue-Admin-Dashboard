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

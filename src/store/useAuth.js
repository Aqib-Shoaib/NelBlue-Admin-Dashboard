// src/store/useAuth.js
import { useMutation, useQuery } from '@tanstack/react-query';
import * as authService from '../services/authService';
import { normalize } from './helpers';



export function useLogin() {
  return useMutation({
    mutationFn: async (payload) => normalize(await authService.login(payload)),
  });
}

export function useSignupInitiate() {
  return useMutation({
    mutationFn: async (payload) => normalize(await authService.signupInitiate(payload)),
  });
}

export function useSignupVerify() {
  return useMutation({
    mutationFn: async (payload) => normalize(await authService.signupVerify(payload)),
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: async (payload) => normalize(await authService.resendOtp(payload)),
  });
}

export function useGetAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => normalize(await authService.getAllUsers()),
  });
}

export function useGetProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => normalize(await authService.getProfile()),
  });
}

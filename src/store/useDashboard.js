// src/store/useDashboard.js
import { useQuery } from '@tanstack/react-query';
import * as dashboardService from '../services/dashboardService';
import { normalize } from './helpers';

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['adminDashboard'],
    queryFn: async () => normalize(await dashboardService.getAdminDashboard()),
  });
   
}

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => normalize(await dashboardService.getAnalytics()),
  });
}

export function useAllProjects() {
  return useQuery({
    queryKey: ['allProjects'],
    queryFn: async () => normalize(await dashboardService.getAllProjects()),
  });
}

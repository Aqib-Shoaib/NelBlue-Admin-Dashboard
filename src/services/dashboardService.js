// src/services/dashboardService.js
import { extractErrorMessage } from '../utils/errorExtractor';
import API from './api';

export const getAdminDashboard = async () => {
  try {
    const res = await API.get('/admin/dashboard');
    return { success: true, data: res.data };
  } catch (error) {
    // console.log(error)
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

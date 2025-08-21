// src/services/dashboardService.js
import { extractErrorMessage } from '../utils/errorExtractor';
import API from './api';

export const getAdminDashboard = async () => {
  try {
    const res = await API.get('/adminDashboard');
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

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

export const getAnalytics = async () => {
  try {
    const res = await API.get('/admin/dashboard/analytics');
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const getAllProjects = async () => {
  try {
    const res = await API.get('/admin/getallProjects');
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

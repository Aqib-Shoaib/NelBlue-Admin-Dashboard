// src/services/authService.js
import { extractErrorMessage } from '../utils/errorExtractor';
import API from './api';

export const login = async (data) => {
  try {
    const res = await API.post('/auth/login', data);
    console.log(res.data)
    const { accessToken, refreshToken } = res.data;
    
    // Store tokens in localStorage immediately
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
    
    // Update API headers
    API.setTokens({ accessToken, refreshToken });
    
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const signupInitiate = async (data) => {
  try {
    const res = await API.post('/admin/signup/initiate', data);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const signupVerify = async (data) => {
  try {
    const res = await API.post('/admin/signup/verify', data);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const resendOtp = async (data) => {
  try {
    const res = await API.put('/admin/signup/resend-otp', data);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const getAllUsers = async () => {
  try {
    const res = await API.get('/auth/getallusers');
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const getProfile = async () => {
  try {
    const res = await API.get('/auth/profile');
    console.log('Profile response:', res);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const approveUser = async (userId) => {
  try {
    const res = await API.put(`/auth/approve-user/${userId}`);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const rejectUser = async (userId) => {
  try {
    const res = await API.put(`/auth/reject-user/${userId}`);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const refreshToken = async (data) => {
  try {
    const res = await API.post('/auth/refreshtoken', data);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

// Add more as needed

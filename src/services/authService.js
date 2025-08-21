// src/services/authService.js
import { extractErrorMessage } from '../utils/errorExtractor';
import API from './api';

export const login = async (data) => {
  try {
    const res = await API.post('/auth/login', data);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const signupInitiate = async (data) => {
  try {
    const res = await API.post('/auth/signup/initiate', data);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const signupVerify = async (data) => {
  try {
    const res = await API.post('/auth/signup/verify', data);
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

export const resendOtp = async (data) => {
  try {
    const res = await API.put('/auth/signup/resend-otp', data);
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
    return { success: true, data: res.data };
  } catch (error) {
    const message = extractErrorMessage(error);
    return { success: false, message };
  }
};

// Add more as needed

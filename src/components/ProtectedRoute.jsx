import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../store/useAuth';
import FullPageSpinner from './FullPageSpinner';

function ProtectedRoute() {
  const { data: profile, isLoading, error, refetch } = useProfile();

  // Check if we have a token first to avoid unnecessary loading
  const hasToken = localStorage.getItem('accessToken');

  // If no token, redirect immediately without loading
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  // Only show loading if we have a token but profile is still loading
  if (isLoading && hasToken) {
    return <FullPageSpinner />;
  }

  // If there's an error, try to handle it gracefully
  if (error && hasToken) {
    // Only clear tokens if it's an authentication error (401, 403)
    if (error?.status === 401 || error?.status === 403) {
      console.log('Authentication error detected, clearing tokens');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return <Navigate to="/login" replace />;
    }
    
    // For other errors, try to refetch the profile once
    if (!error._retry) {
      error._retry = true;
      setTimeout(() => {
        refetch();
      }, 1000);
      return <FullPageSpinner />;
    }
    
    // If refetch fails, then clear tokens
    console.log('Profile refetch failed, clearing tokens');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return <Navigate to="/login" replace />;
  }

  // If not authenticated, redirect to login
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
}

export default ProtectedRoute;

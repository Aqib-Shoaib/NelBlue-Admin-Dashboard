import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../store/useAuth';
import FullPageSpinner from './FullPageSpinner';

function ProtectedRoute() {
  const { data: profile, isLoading, error, refetch } = useProfile();
  const [retryCount, setRetryCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check if we have a token first to avoid unnecessary loading
  const hasToken = localStorage.getItem('accessToken');
  const hasRefreshToken = localStorage.getItem('refreshToken');

  // If no tokens at all, redirect immediately without loading
  if (!hasToken && !hasRefreshToken) {
    return <Navigate to="/login" replace />;
  }

  // If we have a refresh token but no access token, try to refresh
  if (!hasToken && hasRefreshToken && !isRefreshing) {
    setIsRefreshing(true);
    // This will be handled by the API interceptor
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
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
    if (retryCount < 1) {
      setRetryCount(prev => prev + 1);
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

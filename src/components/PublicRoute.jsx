import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../store/useAuth';

function PublicRoute() {
  const { data: profile, isLoading, error } = useProfile();

  // Check if we have a token first to avoid unnecessary loading
  const hasToken = localStorage.getItem('accessToken');

  // If no token, render public routes immediately
  if (!hasToken) {
    return <Outlet />;
  }

  // Only show loading if we have a token but profile is still loading
  if (isLoading && hasToken) {
    return null;
  }

  // If there's an error and we have a token, clear tokens and render public routes
  if (error && hasToken) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return <Outlet />;
  }

  // If authenticated, redirect to dashboard
  if (profile?.data) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render child routes (login/signup pages)
  return <Outlet />;
}

export default PublicRoute;

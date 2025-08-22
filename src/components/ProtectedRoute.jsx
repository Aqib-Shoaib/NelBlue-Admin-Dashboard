import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../store/useAuth';
import FullPageSpinner from './FullPageSpinner';

function ProtectedRoute() {
  const { data: profile, isLoading } = useProfile();

  // While checking authentication status, show loading spinner
  if (isLoading) {
    return <FullPageSpinner />;
  }

  // If not authenticated, redirect to login
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
}

export default ProtectedRoute;

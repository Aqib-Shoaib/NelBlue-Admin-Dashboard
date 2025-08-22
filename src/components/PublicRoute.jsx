import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../store/useAuth';

function PublicRoute() {
  const { data: profile, isLoading } = useProfile();

  // While checking authentication status, show nothing
  if (isLoading) {
    return null;
  }

  // If authenticated, redirect to dashboard
  if (profile?.data) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render child routes (login/signup pages)
  return <Outlet />;
}

export default PublicRoute;

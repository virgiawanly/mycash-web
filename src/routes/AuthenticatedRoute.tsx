import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute = (props: AuthenticatedRouteProps) => {
  const { children } = props;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;

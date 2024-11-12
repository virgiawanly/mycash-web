import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface UnauthenticatedRouteProps {
  children: React.ReactNode;
}

const UnauthenticatedRoute = (props: UnauthenticatedRouteProps) => {
  const { children } = props;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default UnauthenticatedRoute;

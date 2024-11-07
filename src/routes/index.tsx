import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ApplicationLayout from "../layouts/ApplicationLayout/ApplicationLayout";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth/login",
    element: (
      <UnauthenticatedRoute>
        <LoginPage />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <ApplicationLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;

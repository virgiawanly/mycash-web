import { loginRoutes } from '@/features/auth/login';
import { businessEntitiesRoutes } from '@/features/business-entities';
import { dashboardRoutes } from '@/features/dashboard';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

const router = createBrowserRouter([
  {
    path: '/auth',
    children: [
      {
        path: '',
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: 'login',
        element: (
          <UnauthenticatedRoute>
            <Outlet />
          </UnauthenticatedRoute>
        ),
        children: loginRoutes,
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthenticatedRoute>
        <ApplicationLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: '',
        children: dashboardRoutes,
      },
      {
        path: 'settings',
        children: [
          {
            path: 'business-entities',
            children: businessEntitiesRoutes,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;

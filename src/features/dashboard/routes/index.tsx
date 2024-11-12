import { RouteObject } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';

const dashboardRoutes: RouteObject[] = [
  {
    path: '',
    element: <DashboardPage />,
  },
];

export default dashboardRoutes;

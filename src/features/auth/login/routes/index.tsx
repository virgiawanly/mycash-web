import { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const loginRoutes: RouteObject[] = [
  {
    path: '',
    element: <LoginPage />,
  },
];

export default loginRoutes;

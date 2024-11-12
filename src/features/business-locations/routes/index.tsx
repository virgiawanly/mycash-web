import { RouteObject } from 'react-router-dom';
import BusinessLocationListPage from '../pages/BusinessLocationListPage';

const businessLocationsRoutes: RouteObject[] = [
  {
    path: '',
    element: <BusinessLocationListPage />,
  },
];

export default businessLocationsRoutes;

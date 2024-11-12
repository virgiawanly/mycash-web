import { RouteObject } from 'react-router-dom';
import BusinessEntityListPage from '../pages/BusinessEntityListPage';

const businessEntitiesRoutes: RouteObject[] = [
  {
    path: '',
    element: <BusinessEntityListPage />,
  },
];

export default businessEntitiesRoutes;

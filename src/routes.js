import { Navigate } from 'react-router-dom';
import SpacexLayout from 'src/components/SpacexLayout';
import MainLayout from 'src/components/MainLayout';
import SpacexList from 'src/pages/SpacexList';

const routes = [
  {
    path: 'app',
    element: <SpacexLayout />,
    children: [
      { path: 'SpacexList', element: <SpacexList /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/spacexList" /> },
    ]
  }
];

export default routes;

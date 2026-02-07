import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login.tsx';
import VehicleDetails from './pages/VehicleDetails.tsx';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
{
    path: '/login',
    element: <Login />,
  },

  { path: '/vehicles/:id', element: <VehicleDetails /> }
]);

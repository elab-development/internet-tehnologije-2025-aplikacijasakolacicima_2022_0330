import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import VehicleDetails from './pages/VehicleDetails.tsx';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/vehicles/:id', element: <VehicleDetails /> }
]);

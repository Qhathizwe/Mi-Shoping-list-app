import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => 
    {
  return isAuthenticated ? <Outlet />
   : <Navigate to="/login" replace />;
};
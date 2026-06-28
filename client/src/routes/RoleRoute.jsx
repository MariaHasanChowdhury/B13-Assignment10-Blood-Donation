import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return roles.includes(user?.role) ? children : <Navigate to="/dashboard" />;
};

export default RoleRoute;
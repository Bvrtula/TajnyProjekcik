import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ element, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (user.role !== requiredRole) {
    // Redirect to unauthorized or home page if the user role doesn't match
    return <Navigate to="/" replace />;
  }

  return element;
}

export default ProtectedRoute;
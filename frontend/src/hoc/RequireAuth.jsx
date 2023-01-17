import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth.js';
import { isEmptyObject } from '../utils/common.js';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (isEmptyObject(user)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

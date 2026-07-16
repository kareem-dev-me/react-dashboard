import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

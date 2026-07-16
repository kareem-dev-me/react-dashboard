import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/AuthContext";

const Auth: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-8 text-ink">
      <Outlet />
    </div>
  );
};

export default Auth;

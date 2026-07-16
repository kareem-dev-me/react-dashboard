import { Outlet } from "react-router";

const Auth: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-8 text-ink">
      <Outlet />
    </div>
  );
};

export default Auth;

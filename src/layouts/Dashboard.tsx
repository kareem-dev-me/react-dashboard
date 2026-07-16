import { useState } from "react";
import { NavLink, Outlet, Link, useLocation, useNavigate } from "react-router";
import { LogOut } from "lucide-react";

const primaryNav = [
  { to: "/dashboard/home", label: "Home" },
  { to: "/dashboard/orders", label: "Orders" },
  { to: "/dashboard/clients", label: "Clients" },
  { to: "/dashboard/categories", label: "Categories" },
  { to: "/dashboard/products", label: "Products" },
  { to: "/dashboard/users", label: "Users" },
];

const secondaryNav = [
  { to: "/dashboard/settings", label: "Settings" },
  { to: "/dashboard/profile", label: "Profile" },
];

const pageTitles: Record<string, string> = {
  "/dashboard/home": "Home",
  "/dashboard/orders": "Orders",
  "/dashboard/clients": "Clients",
  "/dashboard/categories": "Categories",
  "/dashboard/products": "Products",
  "/dashboard/users": "Users",
  "/dashboard/settings": "Settings",
  "/dashboard/profile": "Profile",
};

function navClassName({ isActive }: { isActive: boolean }) {
  return [
    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-teal-500/15 text-teal-300" : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
  ].join(" ");
}

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[pathname] ?? "Overview";

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    closeSidebar();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/5 bg-slate-950 transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center border-b border-white/5 px-5">
          <Link to="/dashboard/home" className="flex items-center gap-3" onClick={closeSidebar}>
            <img src="/logo.png" alt="Dashboard" className="h-8 w-8 rounded-md object-contain" />
            <span className="text-sm font-semibold tracking-tight text-white">Dashboard</span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
          <div className="flex flex-col gap-0.5">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClassName} onClick={closeSidebar}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-0.5 border-t border-white/5 pt-4">
            {secondaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClassName} onClick={closeSidebar}>
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open sidebar"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <h1 className="text-base font-semibold tracking-tight text-slate-900">{title}</h1>
          </div>

          <Link
            to="/dashboard/profile"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Profile
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

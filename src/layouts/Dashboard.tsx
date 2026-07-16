import { useState } from "react";
import { NavLink, Outlet, Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../store/AuthContext";

const primaryNav = [
  { to: "/dashboard/home", labelKey: "nav.home" },
  { to: "/dashboard/orders", labelKey: "nav.orders" },
  { to: "/dashboard/clients", labelKey: "nav.clients" },
  { to: "/dashboard/categories", labelKey: "nav.categories" },
  { to: "/dashboard/products", labelKey: "nav.products" },
  { to: "/dashboard/users", labelKey: "nav.users" },
];

const secondaryNav = [
  { to: "/dashboard/settings", labelKey: "nav.settings" },
  { to: "/dashboard/profile", labelKey: "nav.profile" },
];

const pageTitleKeys: Record<string, string> = {
  "/dashboard/home": "nav.home",
  "/dashboard/orders": "nav.orders",
  "/dashboard/clients": "nav.clients",
  "/dashboard/categories": "nav.categories",
  "/dashboard/products": "nav.products",
  "/dashboard/users": "nav.users",
  "/dashboard/settings": "nav.settings",
  "/dashboard/profile": "nav.profile",
};

function navClassName({ isActive }: { isActive: boolean }) {
  return [
    "block rounded-lg px-3 py-2 text-start text-sm font-medium transition-colors",
    isActive ? "bg-primary/15 text-primary-fg" : "text-muted hover:bg-white/5 hover:text-white",
  ].join(" ");
}

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const titleKey = pageTitleKeys[pathname];
  const title = titleKey ? t(titleKey) : t("pages.overview");
  const currentLanguage = i18n.language.startsWith("ar") ? "ar" : "en";

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-surface text-ink">
      {sidebarOpen && (
        <button
          type="button"
          aria-label={t("actions.closeSidebar")}
          className="fixed inset-0 z-30 bg-sidebar/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 inset-s-0 z-40 flex w-64 flex-col border-e border-white/5 bg-sidebar transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : currentLanguage === "ar" ? "translate-x-full" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center border-b border-white/5 px-5">
          <Link to="/dashboard/home" className="flex items-center gap-3" onClick={closeSidebar}>
            <img src="/logo.png" alt={t("brand")} className="h-8 w-8 rounded-md object-contain" />
            <span className="text-sm font-semibold tracking-tight text-white">{t("brand")}</span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
          <div className="flex flex-col gap-0.5">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClassName} onClick={closeSidebar}>
                {t(item.labelKey)}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-0.5 border-t border-white/5 pt-4">
            {secondaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClassName} onClick={closeSidebar}>
                {t(item.labelKey)}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4 shrink-0 rtl:-scale-x-100" />
              {t("actions.logout")}
            </button>
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border/80 bg-surface-card/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t("actions.openSidebar")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface lg:hidden cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-base font-semibold tracking-tight text-ink">{title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-border bg-surface p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => void i18n.changeLanguage("en")}
                className={[
                  "rounded-md px-2.5 py-1.5 transition-colors",
                  currentLanguage === "en" ? "bg-surface-card text-ink shadow-sm" : "text-muted hover:text-ink",
                ].join(" ")}
              >
                {t("language.en")}
              </button>
              <button
                type="button"
                onClick={() => void i18n.changeLanguage("ar")}
                className={[
                  "rounded-md px-2.5 py-1.5 transition-colors",
                  currentLanguage === "ar" ? "bg-surface-card text-ink shadow-sm" : "text-muted hover:text-ink",
                ].join(" ")}
              >
                {t("language.ar")}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

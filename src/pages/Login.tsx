import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../store/AuthContext";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = t("login.emailRequired");
    if (!password.trim()) nextErrors.password = t("login.passwordRequired");

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    login(email.trim());
    navigate("/dashboard/home");
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex items-center gap-3">
          <img
            src="/logo.png"
            alt={t("brand")}
            className="h-10 w-10 rounded-md object-contain invert"
          />
          <span className="text-lg font-semibold tracking-tight text-ink">{t("brand")}</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-ink">{t("login.title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("login.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 text-start">
          <label htmlFor="login-email" className="text-sm font-medium text-ink">
            {t("login.email")}
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1.5 text-start">
          <label htmlFor="login-password" className="text-sm font-medium text-ink">
            {t("login.password")}
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
        >
          {t("login.submit")}
        </button>
      </form>
    </div>
  );
};

export default Login;

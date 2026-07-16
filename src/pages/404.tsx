import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home } from "lucide-react";
import { useAuth } from "../store/AuthContext";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const destination = isAuthenticated ? "/dashboard/home" : "/";
  const destinationLabel = isAuthenticated
    ? t("notFound.returnDashboard")
    : t("notFound.returnLogin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-8 text-ink">
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface-card p-8 text-center shadow-sm sm:p-10">
        <p className="text-6xl font-bold tracking-tight text-primary sm:text-7xl">
          {t("notFound.code")}
        </p>
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {t("notFound.title")}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{t("notFound.description")}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={destination}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-muted sm:w-auto"
          >
            <Home className="h-4 w-4" />
            {destinationLabel}
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("notFound.goBack")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

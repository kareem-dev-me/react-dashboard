import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toggle from "../components/Toggle";

const DEFAULT_COMPANY_NAME = "Dashboard";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith("ar") ? "ar" : "en";

  const [companyName, setCompanyName] = useState(DEFAULT_COMPANY_NAME);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    void i18n.changeLanguage(currentLanguage);
    setSavedMessage(true);
    window.setTimeout(() => setSavedMessage(false), 2500);
  };

  const handleReset = () => {
    void i18n.changeLanguage("en");
    setCompanyName(DEFAULT_COMPANY_NAME);
    setOrderUpdates(true);
    setMarketingEmails(true);
    setPushAlerts(true);
    setSavedMessage(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <section className="rounded-xl border border-border bg-surface-card p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-start text-sm font-semibold text-ink">
          {t("settings.general.title")}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="settings-language" className="text-sm font-medium text-ink">
              {t("settings.general.language")}
            </label>
            <select
              id="settings-language"
              value={currentLanguage}
              onChange={(e) => void i18n.changeLanguage(e.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="en">{t("language.en")}</option>
              <option value="ar">{t("language.ar")}</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="settings-company" className="text-sm font-medium text-ink">
              {t("settings.general.companyName")}
            </label>
            <input
              id="settings-company"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface-card p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-start text-sm font-semibold text-ink">
          {t("settings.notifications.title")}
        </h2>

        <div className="divide-y divide-border">
          <Toggle
            id="settings-order-updates"
            checked={orderUpdates}
            onChange={setOrderUpdates}
            label={t("settings.notifications.orderUpdates")}
            hint={t("settings.notifications.orderUpdatesHint")}
          />
          <Toggle
            id="settings-marketing"
            checked={marketingEmails}
            onChange={setMarketingEmails}
            label={t("settings.notifications.marketingEmails")}
            hint={t("settings.notifications.marketingEmailsHint")}
          />
          <Toggle
            id="settings-push"
            checked={pushAlerts}
            onChange={setPushAlerts}
            label={t("settings.notifications.pushAlerts")}
            hint={t("settings.notifications.pushAlertsHint")}
          />
        </div>
      </section>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-card hover:text-ink"
          >
            {t("settings.reset")}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
          >
            {t("settings.save")}
          </button>
        </div>

        {savedMessage && (
          <p className="text-end text-sm font-medium text-primary">{t("settings.savedMessage")}</p>
        )}
      </div>
    </div>
  );
};

export default Settings;

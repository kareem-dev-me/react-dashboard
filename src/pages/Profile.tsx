import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
};

const DEFAULT_PROFILE: ProfileForm = {
  fullName: "Kareem Basuony",
  email: "kareem@example.com",
  phone: "+20 100 000 0000",
  jobTitle: "Product Admin",
};

const MEMBER_SINCE = "2025-08-12";
const LAST_LOGIN = "2026-07-16";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<ProfileForm>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState<ProfileForm>(DEFAULT_PROFILE);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [savedMessage, setSavedMessage] = useState(false);

  const initials = useMemo(() => getInitials(saved.fullName), [saved.fullName]);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: { fullName?: string; email?: string } = {};
    if (!form.fullName.trim()) nextErrors.fullName = t("profile.nameRequired");
    if (!form.email.trim()) nextErrors.email = t("profile.emailRequired");

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const nextSaved: ProfileForm = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      jobTitle: form.jobTitle.trim(),
    };

    setSaved(nextSaved);
    setForm(nextSaved);
    setErrors({});
    setSavedMessage(true);
    window.setTimeout(() => setSavedMessage(false), 2500);
  };

  const handleReset = () => {
    setForm(DEFAULT_PROFILE);
    setSaved(DEFAULT_PROFILE);
    setErrors({});
    setSavedMessage(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <section className="rounded-xl border border-border bg-surface-card p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
            {initials || "KB"}
          </div>

          <div className="min-w-0 flex-1 text-start">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-ink">{saved.fullName}</h2>
              <span className="inline-flex rounded-full bg-primary-deep/15 px-2.5 py-1 text-xs font-semibold text-primary-deep">
                {t("users.roles.admin")}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{saved.email}</p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <div className="text-start">
            <dt className="text-xs font-medium text-muted">{t("profile.memberSince")}</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{MEMBER_SINCE}</dd>
          </div>
          <div className="text-start">
            <dt className="text-xs font-medium text-muted">{t("profile.lastLogin")}</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{LAST_LOGIN}</dd>
          </div>
        </dl>
      </section>

      <form
        onSubmit={handleSave}
        className="rounded-xl border border-border bg-surface-card p-4 shadow-sm sm:p-6"
      >
        <h2 className="mb-4 text-start text-sm font-semibold text-ink">
          {t("profile.personalInfo")}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="profile-name" className="text-sm font-medium text-ink">
              {t("profile.fullName")}
            </label>
            <input
              id="profile-name"
              type="text"
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.fullName && <p className="text-xs text-red-600">{errors.fullName}</p>}
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="profile-email" className="text-sm font-medium text-ink">
              {t("profile.email")}
            </label>
            <input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="profile-phone" className="text-sm font-medium text-ink">
              {t("profile.phone")}
            </label>
            <input
              id="profile-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="profile-job" className="text-sm font-medium text-ink">
              {t("profile.jobTitle")}
            </label>
            <input
              id="profile-job"
              type="text"
              value={form.jobTitle}
              onChange={(e) => setForm((prev) => ({ ...prev, jobTitle: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {t("profile.reset")}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
            >
              {t("profile.save")}
            </button>
          </div>

          {savedMessage && (
            <p className="text-end text-sm font-medium text-primary">
              {t("profile.savedMessage")}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;

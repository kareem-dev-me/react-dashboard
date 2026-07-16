import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search } from "lucide-react";
import Dialog from "../components/Dialog";

type UserStatus = "active" | "inactive";
type UserRole = "admin" | "manager" | "staff";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
};

type UserForm = {
  name: string;
  email: string;
  role: UserRole;
};

const ROLE_OPTIONS: UserRole[] = ["admin", "manager", "staff"];

const INITIAL_USERS: User[] = [
  {
    id: "u1",
    name: "Kareem Basuony",
    email: "kareem@example.com",
    role: "admin",
    status: "active",
    joined: "2025-08-12",
  },
  {
    id: "u2",
    name: "Sara Ali",
    email: "sara.ali@example.com",
    role: "manager",
    status: "active",
    joined: "2025-09-03",
  },
  {
    id: "u3",
    name: "Omar Hassan",
    email: "omar.hassan@example.com",
    role: "staff",
    status: "active",
    joined: "2025-10-18",
  },
  {
    id: "u4",
    name: "Lina Farouk",
    email: "lina.farouk@example.com",
    role: "staff",
    status: "inactive",
    joined: "2025-11-02",
  },
  {
    id: "u5",
    name: "Youssef Nabil",
    email: "youssef.nabil@example.com",
    role: "manager",
    status: "active",
    joined: "2026-01-14",
  },
  {
    id: "u6",
    name: "Nour El-Din",
    email: "nour.eldin@example.com",
    role: "staff",
    status: "active",
    joined: "2026-02-21",
  },
  {
    id: "u7",
    name: "Mariam Saleh",
    email: "mariam.saleh@example.com",
    role: "staff",
    status: "inactive",
    joined: "2026-03-08",
  },
  {
    id: "u8",
    name: "Hana Mahmoud",
    email: "hana.mahmoud@example.com",
    role: "manager",
    status: "active",
    joined: "2026-04-30",
  },
];

const EMPTY_FORM: UserForm = {
  name: "",
  email: "",
  role: "staff",
};

function statusBadgeClass(status: UserStatus) {
  return status === "active"
    ? "bg-primary/15 text-primary-muted"
    : "bg-ink/10 text-muted";
}

function roleBadgeClass(role: UserRole) {
  switch (role) {
    case "admin":
      return "bg-primary-deep/15 text-primary-deep";
    case "manager":
      return "bg-primary/10 text-primary";
    case "staff":
      return "bg-ink/10 text-muted";
  }
}

const Users: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<UserForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const counts = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      inactive: users.filter((u) => u.status === "inactive").length,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [users, search]);

  const kpis = [
    { label: t("users.kpis.total"), value: counts.total },
    { label: t("users.kpis.active"), value: counts.active },
    { label: t("users.kpis.inactive"), value: counts.inactive },
  ];

  const closeDialog = () => {
    setDialogOpen(false);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: { name?: string; email?: string } = {};
    if (!form.name.trim()) nextErrors.name = t("users.dialog.nameRequired");
    if (!form.email.trim()) nextErrors.email = t("users.dialog.emailRequired");

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const newUser: User = {
      id: `u${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      status: "active",
      joined: today,
    };

    setUsers((prev) => [newUser, ...prev]);
    closeDialog();
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <article
            key={kpi.label}
            className="rounded-xl border border-border bg-surface-card p-4 text-start shadow-sm"
          >
            <p className="text-sm font-medium text-muted">{kpi.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{kpi.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-surface-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full max-w-md">
            <Search className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("users.searchPlaceholder")}
              className="w-full rounded-lg border border-border bg-surface py-2 pe-3 ps-9 text-sm text-ink outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
          >
            <Plus className="h-4 w-4" />
            {t("users.addUser")}
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-start text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-3 py-3 font-medium">{t("users.table.name")}</th>
                <th className="px-3 py-3 font-medium">{t("users.table.email")}</th>
                <th className="px-3 py-3 font-medium">{t("users.table.role")}</th>
                <th className="px-3 py-3 font-medium">{t("users.table.status")}</th>
                <th className="px-3 py-3 font-medium">{t("users.table.joined")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-b-0 text-center">
                  <td className="px-3 py-3 font-medium text-ink">{user.name}</td>
                  <td className="px-3 py-3 text-ink/80">{user.email}</td>
                  <td className="px-3 py-3">
                    <span
                      className={[
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        roleBadgeClass(user.role),
                      ].join(" ")}
                    >
                      {t(`users.roles.${user.role}`)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={[
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        statusBadgeClass(user.status),
                      ].join(" ")}
                    >
                      {t(`users.status.${user.status}`)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">{t("users.empty")}</p>
          )}
        </div>
      </section>

      <Dialog open={dialogOpen} onClose={closeDialog} title={t("users.dialog.title")}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-name" className="text-sm font-medium text-ink">
              {t("users.dialog.name")}
            </label>
            <input
              id="user-name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-email" className="text-sm font-medium text-ink">
              {t("users.dialog.email")}
            </label>
            <input
              id="user-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-role" className="text-sm font-medium text-ink">
              {t("users.dialog.role")}
            </label>
            <select
              id="user-role"
              value={form.role}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, role: e.target.value as UserRole }))
              }
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {t(`users.roles.${role}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {t("users.dialog.cancel")}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
            >
              {t("users.dialog.save")}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Users;

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search } from "lucide-react";
import Dialog from "../components/Dialog";

type ClientStatus = "active" | "inactive";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
  joined: string;
};

type ClientForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

const INITIAL_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    phone: "+20 100 111 2233",
    company: "Nile Soft",
    status: "active",
    joined: "2026-01-12",
  },
  {
    id: "c2",
    name: "Omar Hassan",
    email: "omar.hassan@example.com",
    phone: "+20 101 222 3344",
    company: "Cairo Labs",
    status: "active",
    joined: "2026-02-03",
  },
  {
    id: "c3",
    name: "Lina Farouk",
    email: "lina.farouk@example.com",
    phone: "+20 102 333 4455",
    company: "Delta Retail",
    status: "inactive",
    joined: "2025-11-20",
  },
  {
    id: "c4",
    name: "Youssef Nabil",
    email: "youssef.nabil@example.com",
    phone: "+20 103 444 5566",
    company: "Alex Trade",
    status: "active",
    joined: "2026-03-08",
  },
  {
    id: "c5",
    name: "Nour El-Din",
    email: "nour.eldin@example.com",
    phone: "+20 104 555 6677",
    company: "Pyramid Co",
    status: "active",
    joined: "2026-04-15",
  },
  {
    id: "c6",
    name: "Mariam Saleh",
    email: "mariam.saleh@example.com",
    phone: "+20 105 666 7788",
    company: "Horizon Media",
    status: "inactive",
    joined: "2025-09-01",
  },
  {
    id: "c7",
    name: "Karim Adel",
    email: "karim.adel@example.com",
    phone: "+20 106 777 8899",
    company: "Bright Path",
    status: "active",
    joined: "2026-05-22",
  },
  {
    id: "c8",
    name: "Hana Mahmoud",
    email: "hana.mahmoud@example.com",
    phone: "+20 107 888 9900",
    company: "Oasis Group",
    status: "active",
    joined: "2026-06-10",
  },
];

const EMPTY_FORM: ClientForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
};

function statusBadgeClass(status: ClientStatus) {
  return status === "active"
    ? "bg-primary/15 text-primary-muted"
    : "bg-ink/10 text-muted";
}

const Clients: React.FC = () => {
  const { t } = useTranslation();
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ClientForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const counts = useMemo(() => {
    return {
      total: clients.length,
      active: clients.filter((c) => c.status === "active").length,
      inactive: clients.filter((c) => c.status === "inactive").length,
    };
  }, [clients]);

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return clients;
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query),
    );
  }, [clients, search]);

  const kpis = [
    { label: t("clients.kpis.total"), value: counts.total },
    { label: t("clients.kpis.active"), value: counts.active },
    { label: t("clients.kpis.inactive"), value: counts.inactive },
  ];

  const closeDialog = () => {
    setDialogOpen(false);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: { name?: string; email?: string } = {};
    if (!form.name.trim()) nextErrors.name = t("clients.dialog.nameRequired");
    if (!form.email.trim()) nextErrors.email = t("clients.dialog.emailRequired");

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const newClient: Client = {
      id: `c${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || "—",
      company: form.company.trim() || "—",
      status: "active",
      joined: today,
    };

    setClients((prev) => [newClient, ...prev]);
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
              placeholder={t("clients.searchPlaceholder")}
              className="w-full rounded-lg border border-border bg-surface py-2 pe-3 ps-9 text-sm text-ink outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
          >
            <Plus className="h-4 w-4" />
            {t("clients.addClient")}
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-start text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-3 py-3 font-medium">{t("clients.table.name")}</th>
                <th className="px-3 py-3 font-medium">{t("clients.table.email")}</th>
                <th className="px-3 py-3 font-medium">{t("clients.table.phone")}</th>
                <th className="px-3 py-3 font-medium">{t("clients.table.company")}</th>
                <th className="px-3 py-3 font-medium">{t("clients.table.status")}</th>
                <th className="px-3 py-3 font-medium">{t("clients.table.joined")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-border last:border-b-0 text-center">
                  <td className="px-3 py-3 font-medium text-ink">{client.name}</td>
                  <td className="px-3 py-3 text-ink/80">{client.email}</td>
                  <td className="px-3 py-3 text-muted">{client.phone}</td>
                  <td className="px-3 py-3 text-ink/80">{client.company}</td>
                  <td className="px-3 py-3">
                    <span
                      className={[
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        statusBadgeClass(client.status),
                      ].join(" ")}
                    >
                      {t(`clients.status.${client.status}`)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted">{client.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredClients.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">{t("clients.empty")}</p>
          )}
        </div>
      </section>

      <Dialog open={dialogOpen} onClose={closeDialog} title={t("clients.dialog.title")}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="client-name" className="text-sm font-medium text-ink">
              {t("clients.dialog.name")}
            </label>
            <input
              id="client-name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="client-email" className="text-sm font-medium text-ink">
              {t("clients.dialog.email")}
            </label>
            <input
              id="client-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="client-phone" className="text-sm font-medium text-ink">
              {t("clients.dialog.phone")}
            </label>
            <input
              id="client-phone"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="client-company" className="text-sm font-medium text-ink">
              {t("clients.dialog.company")}
            </label>
            <input
              id="client-company"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {t("clients.dialog.cancel")}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
            >
              {t("clients.dialog.save")}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Clients;

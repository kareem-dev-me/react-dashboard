import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

type Order = {
  id: string;
  client: string;
  date: string;
  items: number;
  total: string;
  status: OrderStatus;
};

const MOCK_ORDERS: Order[] = [
  { id: "#1042", client: "Sarah Ahmed", date: "2026-07-16", items: 3, total: "$248.00", status: "pending" },
  { id: "#1041", client: "Omar Hassan", date: "2026-07-15", items: 1, total: "$89.50", status: "shipped" },
  { id: "#1040", client: "Lina Farouk", date: "2026-07-15", items: 5, total: "$412.20", status: "delivered" },
  { id: "#1039", client: "Youssef Nabil", date: "2026-07-14", items: 2, total: "$156.00", status: "cancelled" },
  { id: "#1038", client: "Nour El-Din", date: "2026-07-14", items: 4, total: "$320.75", status: "delivered" },
  { id: "#1037", client: "Mariam Saleh", date: "2026-07-13", items: 1, total: "$64.00", status: "shipped" },
  { id: "#1036", client: "Karim Adel", date: "2026-07-12", items: 6, total: "$510.90", status: "pending" },
  { id: "#1035", client: "Hana Mahmoud", date: "2026-07-11", items: 2, total: "$198.40", status: "delivered" },
  { id: "#1034", client: "Tarek Mostafa", date: "2026-07-10", items: 3, total: "$275.00", status: "shipped" },
  { id: "#1033", client: "Dina Kamal", date: "2026-07-09", items: 1, total: "$45.00", status: "cancelled" },
];

const STATUS_FILTERS: Array<"all" | OrderStatus> = [
  "all",
  "pending",
  "shipped",
  "delivered",
  "cancelled",
];

function statusBadgeClass(status: OrderStatus) {
  switch (status) {
    case "pending":
      return "bg-primary/15 text-primary-muted";
    case "shipped":
      return "bg-primary/10 text-primary";
    case "delivered":
      return "bg-primary-deep/15 text-primary-deep";
    case "cancelled":
      return "bg-ink/10 text-muted";
  }
}

const Orders: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const counts = useMemo(() => {
    return {
      total: MOCK_ORDERS.length,
      pending: MOCK_ORDERS.filter((o) => o.status === "pending").length,
      shipped: MOCK_ORDERS.filter((o) => o.status === "shipped").length,
      delivered: MOCK_ORDERS.filter((o) => o.status === "delivered").length,
    };
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MOCK_ORDERS.filter((order) => {
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesSearch =
        query.length === 0 ||
        order.id.toLowerCase().includes(query) ||
        order.client.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const kpis = [
    { label: t("orders.kpis.total"), value: counts.total },
    { label: t("orders.kpis.pending"), value: counts.pending },
    { label: t("orders.kpis.shipped"), value: counts.shipped },
    { label: t("orders.kpis.delivered"), value: counts.delivered },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full max-w-md">
            <Search className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("orders.searchPlaceholder")}
              className="w-full rounded-lg border border-border bg-surface py-2 pe-3 ps-9 text-sm text-ink outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((status) => {
              const label =
                status === "all" ? t("orders.filters.all") : t(`orders.status.${status}`);
              const isActive = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={[
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "bg-surface text-muted hover:bg-primary/10 hover:text-primary",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-start text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-3 py-3 font-medium">{t("orders.table.id")}</th>
                <th className="px-3 py-3 font-medium">{t("orders.table.client")}</th>
                <th className="px-3 py-3 font-medium">{t("orders.table.date")}</th>
                <th className="px-3 py-3 font-medium">{t("orders.table.items")}</th>
                <th className="px-3 py-3 font-medium">{t("orders.table.total")}</th>
                <th className="px-3 py-3 font-medium">{t("orders.table.status")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-b-0 text-center">
                  <td className="px-3 py-3 font-medium text-ink">{order.id}</td>
                  <td className="px-3 py-3 text-ink/80">{order.client}</td>
                  <td className="px-3 py-3 text-muted">{order.date}</td>
                  <td className="px-3 py-3 text-ink/80">{order.items}</td>
                  <td className="px-3 py-3 font-medium text-ink">{order.total}</td>
                  <td className="px-3 py-3">
                    <span
                      className={[
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        statusBadgeClass(order.status),
                      ].join(" ")}
                    >
                      {t(`orders.status.${order.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">{t("orders.empty")}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders;

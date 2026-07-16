import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search } from "lucide-react";
import Dialog from "../components/Dialog";

type CategoryStatus = "active" | "inactive";

type Category = {
  id: string;
  name: string;
  description: string;
  products: number;
  status: CategoryStatus;
  created: string;
};

type CategoryForm = {
  name: string;
  description: string;
};

const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat1",
    name: "Electronics",
    description: "Phones, laptops, and gadgets",
    products: 128,
    status: "active",
    created: "2025-10-02",
  },
  {
    id: "cat2",
    name: "Clothing",
    description: "Apparel and accessories",
    products: 96,
    status: "active",
    created: "2025-10-12",
  },
  {
    id: "cat3",
    name: "Home",
    description: "Furniture and home essentials",
    products: 74,
    status: "active",
    created: "2025-11-05",
  },
  {
    id: "cat4",
    name: "Sports",
    description: "Fitness and outdoor gear",
    products: 52,
    status: "active",
    created: "2025-12-18",
  },
  {
    id: "cat5",
    name: "Beauty",
    description: "Skincare and personal care",
    products: 41,
    status: "inactive",
    created: "2026-01-20",
  },
  {
    id: "cat6",
    name: "Books",
    description: "Print and digital titles",
    products: 63,
    status: "active",
    created: "2026-02-14",
  },
  {
    id: "cat7",
    name: "Toys",
    description: "Kids toys and games",
    products: 38,
    status: "inactive",
    created: "2026-03-01",
  },
  {
    id: "cat8",
    name: "Grocery",
    description: "Pantry and everyday food",
    products: 87,
    status: "active",
    created: "2026-04-09",
  },
];

const EMPTY_FORM: CategoryForm = {
  name: "",
  description: "",
};

function statusBadgeClass(status: CategoryStatus) {
  return status === "active"
    ? "bg-primary/15 text-primary-muted"
    : "bg-ink/10 text-muted";
}

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<CategoryForm>(EMPTY_FORM);
  const [error, setError] = useState<string | undefined>();

  const counts = useMemo(() => {
    return {
      total: categories.length,
      active: categories.filter((c) => c.status === "active").length,
      inactive: categories.filter((c) => c.status === "inactive").length,
    };
  }, [categories]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query),
    );
  }, [categories, search]);

  const kpis = [
    { label: t("categories.kpis.total"), value: counts.total },
    { label: t("categories.kpis.active"), value: counts.active },
    { label: t("categories.kpis.inactive"), value: counts.inactive },
  ];

  const closeDialog = () => {
    setDialogOpen(false);
    setForm(EMPTY_FORM);
    setError(undefined);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError(t("categories.dialog.nameRequired"));
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const newCategory: Category = {
      id: `cat${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim() || "—",
      products: 0,
      status: "active",
      created: today,
    };

    setCategories((prev) => [newCategory, ...prev]);
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
              placeholder={t("categories.searchPlaceholder")}
              className="w-full rounded-lg border border-border bg-surface py-2 pe-3 ps-9 text-sm text-ink outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
          >
            <Plus className="h-4 w-4" />
            {t("categories.addCategory")}
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-start text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-3 py-3 font-medium">{t("categories.table.name")}</th>
                <th className="px-3 py-3 font-medium">{t("categories.table.description")}</th>
                <th className="px-3 py-3 font-medium">{t("categories.table.products")}</th>
                <th className="px-3 py-3 font-medium">{t("categories.table.status")}</th>
                <th className="px-3 py-3 font-medium">{t("categories.table.created")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b border-border last:border-b-0 text-center">
                  <td className="px-3 py-3 font-medium text-ink">{category.name}</td>
                  <td className="max-w-xs truncate px-3 py-3 text-ink/80">{category.description}</td>
                  <td className="px-3 py-3 text-ink/80">{category.products}</td>
                  <td className="px-3 py-3">
                    <span
                      className={[
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        statusBadgeClass(category.status),
                      ].join(" ")}
                    >
                      {t(`categories.status.${category.status}`)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted">{category.created}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCategories.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">{t("categories.empty")}</p>
          )}
        </div>
      </section>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        title={t("categories.dialog.title")}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category-name" className="text-sm font-medium text-ink">
              {t("categories.dialog.name")}
            </label>
            <input
              id="category-name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="category-description" className="text-sm font-medium text-ink">
              {t("categories.dialog.description")}
            </label>
            <textarea
              id="category-description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {t("categories.dialog.cancel")}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
            >
              {t("categories.dialog.save")}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Categories;

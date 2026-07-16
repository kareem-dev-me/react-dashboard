import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search } from "lucide-react";
import Dialog from "../components/Dialog";

type ProductStatus = "in_stock" | "low_stock" | "out_of_stock";

type CategoryKey =
  | "electronics"
  | "clothing"
  | "home"
  | "sports"
  | "beauty"
  | "books";

type Product = {
  id: string;
  name: string;
  category: CategoryKey;
  price: number;
  stock: number;
};

type ProductForm = {
  name: string;
  category: CategoryKey;
  price: string;
  stock: string;
};

const CATEGORY_OPTIONS: CategoryKey[] = [
  "electronics",
  "clothing",
  "home",
  "sports",
  "beauty",
  "books",
];

const INITIAL_PRODUCTS: Product[] = [
  { id: "p1", name: "Nova Watch", category: "electronics", price: 249.0, stock: 42 },
  { id: "p2", name: "Soft Tee", category: "clothing", price: 29.5, stock: 120 },
  { id: "p3", name: "Desk Lamp", category: "home", price: 64.0, stock: 8 },
  { id: "p4", name: "Yoga Mat", category: "sports", price: 39.99, stock: 0 },
  { id: "p5", name: "Glow Serum", category: "beauty", price: 48.0, stock: 25 },
  { id: "p6", name: "Design Systems", category: "books", price: 34.0, stock: 15 },
  { id: "p7", name: "Wireless Buds", category: "electronics", price: 129.0, stock: 6 },
  { id: "p8", name: "Trail Runner", category: "sports", price: 98.0, stock: 33 },
];

const EMPTY_FORM: ProductForm = {
  name: "",
  category: "electronics",
  price: "",
  stock: "0",
};

function stockStatus(stock: number): ProductStatus {
  if (stock <= 0) return "out_of_stock";
  if (stock < 10) return "low_stock";
  return "in_stock";
}

function statusBadgeClass(status: ProductStatus) {
  switch (status) {
    case "in_stock":
      return "bg-primary/15 text-primary-muted";
    case "low_stock":
      return "bg-primary/10 text-primary";
    case "out_of_stock":
      return "bg-ink/10 text-muted";
  }
}

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  const counts = useMemo(() => {
    return {
      total: products.length,
      inStock: products.filter((p) => stockStatus(p.stock) === "in_stock").length,
      lowStock: products.filter((p) => stockStatus(p.stock) === "low_stock").length,
      outOfStock: products.filter((p) => stockStatus(p.stock) === "out_of_stock").length,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) => {
      const categoryLabel = t(`products.categories.${product.category}`).toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        categoryLabel.includes(query) ||
        product.category.includes(query)
      );
    });
  }, [products, search, t]);

  const kpis = [
    { label: t("products.kpis.total"), value: counts.total },
    { label: t("products.kpis.inStock"), value: counts.inStock },
    { label: t("products.kpis.lowStock"), value: counts.lowStock },
    { label: t("products.kpis.outOfStock"), value: counts.outOfStock },
  ];

  const closeDialog = () => {
    setDialogOpen(false);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: { name?: string; price?: string } = {};
    if (!form.name.trim()) nextErrors.name = t("products.dialog.nameRequired");
    if (!form.price.trim() || Number.isNaN(Number(form.price))) {
      nextErrors.price = t("products.dialog.priceRequired");
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const stock = Math.max(0, Math.floor(Number(form.stock) || 0));
    const newProduct: Product = {
      id: `p${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock,
    };

    setProducts((prev) => [newProduct, ...prev]);
    closeDialog();
  };

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full max-w-md">
            <Search className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("products.searchPlaceholder")}
              className="w-full rounded-lg border border-border bg-surface py-2 pe-3 ps-9 text-sm text-ink outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
          >
            <Plus className="h-4 w-4" />
            {t("products.addProduct")}
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-start text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-3 py-3 font-medium">{t("products.table.name")}</th>
                <th className="px-3 py-3 font-medium">{t("products.table.category")}</th>
                <th className="px-3 py-3 font-medium">{t("products.table.price")}</th>
                <th className="px-3 py-3 font-medium">{t("products.table.stock")}</th>
                <th className="px-3 py-3 font-medium">{t("products.table.status")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const status = stockStatus(product.stock);
                return (
                  <tr key={product.id} className="border-b border-border last:border-b-0 text-center">
                    <td className="px-3 py-3 font-medium text-ink">{product.name}</td>
                    <td className="px-3 py-3 text-ink/80">
                      {t(`products.categories.${product.category}`)}
                    </td>
                    <td className="px-3 py-3 font-medium text-ink">{formatPrice(product.price)}</td>
                    <td className="px-3 py-3 text-ink/80">{product.stock}</td>
                    <td className="px-3 py-3">
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                          statusBadgeClass(status),
                        ].join(" ")}
                      >
                        {t(`products.status.${status}`)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">{t("products.empty")}</p>
          )}
        </div>
      </section>

      <Dialog open={dialogOpen} onClose={closeDialog} title={t("products.dialog.title")}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="product-name" className="text-sm font-medium text-ink">
              {t("products.dialog.name")}
            </label>
            <input
              id="product-name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="product-category" className="text-sm font-medium text-ink">
              {t("products.dialog.category")}
            </label>
            <select
              id="product-category"
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value as CategoryKey }))
              }
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {CATEGORY_OPTIONS.map((key) => (
                <option key={key} value={key}>
                  {t(`products.categories.${key}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="product-price" className="text-sm font-medium text-ink">
                {t("products.dialog.price")}
              </label>
              <input
                id="product-price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {errors.price && <p className="text-xs text-red-600">{errors.price}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="product-stock" className="text-sm font-medium text-ink">
                {t("products.dialog.stock")}
              </label>
              <input
                id="product-stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {t("products.dialog.cancel")}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-muted"
            >
              {t("products.dialog.save")}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Products;

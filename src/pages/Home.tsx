import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PRIMARY = "var(--color-primary)";
const PRIMARY_SOFT = "var(--color-primary-soft)";
const PRIMARY_MUTED = "var(--color-primary-muted)";
const PRIMARY_FG = "var(--color-primary-fg)";
const PRIMARY_DEEP = "var(--color-primary-deep)";
const BORDER = "var(--color-border)";
const MUTED = "var(--color-muted)";

const CATEGORY_COLORS = [PRIMARY, PRIMARY_MUTED, PRIMARY_FG, PRIMARY_DEEP];

const Home: React.FC = () => {
  const { t } = useTranslation();

  const kpis = [
    {
      label: t("home.kpis.revenue"),
      value: "$48,290",
      change: t("home.kpis.revenueChange"),
    },
    {
      label: t("home.kpis.orders"),
      value: "1,284",
      change: t("home.kpis.ordersChange"),
    },
    {
      label: t("home.kpis.clients"),
      value: "862",
      change: t("home.kpis.clientsChange"),
    },
    {
      label: t("home.kpis.products"),
      value: "346",
      change: t("home.kpis.productsChange"),
    },
  ];

  const revenueData = [
    { month: t("home.months.jan"), revenue: 32000 },
    { month: t("home.months.feb"), revenue: 28000 },
    { month: t("home.months.mar"), revenue: 36000 },
    { month: t("home.months.apr"), revenue: 41000 },
    { month: t("home.months.may"), revenue: 39000 },
    { month: t("home.months.jun"), revenue: 48290 },
  ];

  const ordersData = [
    { day: t("home.days.mon"), orders: 142 },
    { day: t("home.days.tue"), orders: 168 },
    { day: t("home.days.wed"), orders: 155 },
    { day: t("home.days.thu"), orders: 190 },
    { day: t("home.days.fri"), orders: 210 },
    { day: t("home.days.sat"), orders: 175 },
    { day: t("home.days.sun"), orders: 120 },
  ];

  const categoryData = [
    { name: t("home.categories.electronics"), value: 38 },
    { name: t("home.categories.clothing"), value: 27 },
    { name: t("home.categories.home"), value: 20 },
    { name: t("home.categories.sports"), value: 15 },
  ];

  const activity = [
    { text: t("home.activity.item1"), time: t("home.activity.time1") },
    { text: t("home.activity.item2"), time: t("home.activity.time2") },
    { text: t("home.activity.item3"), time: t("home.activity.time3") },
    { text: t("home.activity.item4"), time: t("home.activity.time4") },
    { text: t("home.activity.item5"), time: t("home.activity.time5") },
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
            <p className="mt-1 text-xs font-medium text-primary">{kpi.change}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-border bg-surface-card p-4 shadow-sm">
          <h2 className="mb-4 text-start text-sm font-semibold text-ink">
            {t("home.charts.revenueTitle")}
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={PRIMARY} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="month" tick={{ fill: MUTED, fontSize: 12 }} />
                <YAxis tick={{ fill: MUTED, fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name={t("home.charts.revenue")}
                  stroke={PRIMARY}
                  fill="url(#revenueFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-border bg-surface-card p-4 shadow-sm">
          <h2 className="mb-4 text-start text-sm font-semibold text-ink">
            {t("home.charts.ordersTitle")}
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="day" tick={{ fill: MUTED, fontSize: 12 }} />
                <YAxis tick={{ fill: MUTED, fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  name={t("home.charts.orders")}
                  fill={PRIMARY}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-border bg-surface-card p-4 shadow-sm">
          <h2 className="mb-4 text-start text-sm font-semibold text-ink">
            {t("home.charts.categoriesTitle")}
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      stroke={PRIMARY_SOFT}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-border bg-surface-card p-4 shadow-sm">
          <h2 className="mb-4 text-start text-sm font-semibold text-ink">
            {t("home.activity.title")}
          </h2>
          <ul className="divide-y divide-border">
            {activity.map((item) => (
              <li
                key={item.text}
                className="flex items-start justify-between gap-3 py-3 text-start first:pt-0 last:pb-0"
              >
                <span className="text-sm text-ink/80">{item.text}</span>
                <span className="shrink-0 text-xs text-muted">{item.time}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
};

export default Home;

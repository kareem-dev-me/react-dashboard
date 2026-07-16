import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AuthProvider } from "./store/AuthContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./layouts/Auth.tsx").then((m) => ({ Component: m.default })),
    children: [
      {
        path: "",
        lazy: () => import("./pages/Login.tsx").then((m) => ({ Component: m.default })),
      },
    ],
  },
  {
    path: "/dashboard",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        lazy: () => import("./layouts/Dashboard.tsx").then((m) => ({ Component: m.default })),
        children: [
          {
            path: "home",
            lazy: () => import("./pages/Home.tsx").then((m) => ({ Component: m.default })),
          },
          {
            path: "orders",
            lazy: () => import("./pages/Orders.tsx").then((m) => ({ Component: m.default })),
          },
          {
            path: "clients",
            lazy: () => import("./pages/Clients.tsx").then((m) => ({ Component: m.default })),
          },
          {
            path: "categories",
            lazy: () => import("./pages/Categories.tsx").then((m) => ({ Component: m.default })),
          },
          {
            path: "products",
            lazy: () => import("./pages/Products.tsx").then((m) => ({ Component: m.default })),
          },
          {
            path: "users",
            lazy: () => import("./pages/Users.tsx").then((m) => ({ Component: m.default })),
          },
          {
            path: "settings",
            lazy: () => import("./pages/Settings.tsx").then((m) => ({ Component: m.default })),
          },
          {
            path: "profile",
            lazy: () => import("./pages/Profile.tsx").then((m) => ({ Component: m.default })),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    lazy: () => import("./pages/404.tsx").then((m) => ({ Component: m.default })),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-surface text-sm text-muted">
            Loading…
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  </StrictMode>
);

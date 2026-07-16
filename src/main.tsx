import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home.tsx";
import Dashboard from "./layouts/Dashboard.tsx";
import Orders from "./pages/Orders.tsx";
import Clients from "./pages/Clients.tsx";
import Products from "./pages/Products.tsx";
import Login from "./pages/Login.tsx";
import Auth from "./layouts/Auth.tsx";
import Users from "./pages/Users.tsx";
import Settings from "./pages/Settings.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/404.tsx";
import Categories from "./pages/Categories.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AuthProvider } from "./store/AuthContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Auth,
    children: [
      {
        path: "",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        Component: Dashboard,
        children: [
          {
            path: "home",
            Component: Home,
          },
          {
            path: "orders",
            Component: Orders,
          },
          {
            path: "clients",
            Component: Clients,
          },
          {
            path: "categories",
            Component: Categories,
          },
          {
            path: "products",
            Component: Products,
          },
          {
            path: "users",
            Component: Users,
          },
          {
            path: "settings",
            Component: Settings,
          },
          {
            path: "profile",
            Component: Profile,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ContextProvider, useStateContext } from "contexts/ContextProvider";
import GuestLayout from "layouts/GuestLayout";
import DefaultLayout from "layouts/DefaultLayout";

const Dashboard = React.lazy(() => import("pages/dashboard")); // Dynamic import
const Login = React.lazy(() => import("pages/login")); // Dynamic import
const Notfound = React.lazy(() => import("pages/not-found")); // Dynamic import
const User = React.lazy(() => import("pages/user")); // Dynamic import

type ProtectedRouteProps = {
  element: React.ReactNode;
  title?: string;
};

const RouteElement = ({ element, title }: ProtectedRouteProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (title) {
      document.title = t("titles." + title);
    }
  }, [t, title]);

  return element;
};

const ProtectedRoute = ({ element, title }: ProtectedRouteProps) => {
  const { token } = useStateContext();

  return token ? (
    <RouteElement element={element} title={title} />
  ) : (
    <Navigate to="/login" replace />
  );
};

const routes = [
  {
    path: "/",
    element: <ProtectedRoute title="Dashboard" element={<DefaultLayout />} />,
    children: [
      { path: "", element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <ProtectedRoute title="Dashboard" element={<Dashboard />} /> },
      { path: "user", element: <ProtectedRoute title="User" element={<User />} /> },
    ],
  },
  {
    path: "/login",
    element: <GuestLayout />,
    children: [{ path: "", element: <RouteElement element={<Login />} title="Login" /> }],
  },
  { path: "*", element: <RouteElement element={<Notfound />} title="Notfound" /> },
];

const router = createBrowserRouter(routes);

const RouterProviderInstance = () => (
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);

export default RouterProviderInstance;

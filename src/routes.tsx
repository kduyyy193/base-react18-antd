import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ContextProvider, useStateContext } from "contexts/ContextProvider";
import DefaultLayout from "layouts/DefaultLayout";
import GuestLayout from "layouts/GuestLayout";
import Dashboard from "pages/dashboard";
import Login from "pages/login";
import Notfound from "pages/not-found";
import User from "pages/user";

type ProtectedRouteProps = {
  element: React.ReactNode;
  title?: string;
};

const RouteElement = ({ element, title }: ProtectedRouteProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("titles." + title || "");
  });

  return element;
};

const ProtectedRoute = ({ element, title }: ProtectedRouteProps) => {
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <RouteElement element={element} title={title} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute title="Dashboard" element={<DefaultLayout />} />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute title="Dashboard" element={<Navigate to={"/dashboard"} />} />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute title="Dashboard" element={<Dashboard />} />,
      },
      {
        path: "/user",
        element: <ProtectedRoute title="User" element={<User />} />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <RouteElement element={<Login />} title="Login" />,
      },
    ],
  },
  {
    path: "*",
    element: <RouteElement element={<Notfound />} title="Notfound" />,
  },
]);

const RouterProviderInstance = () => (
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);

export default RouterProviderInstance;

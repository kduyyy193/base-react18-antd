import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Notfound, Dashboard, User } from "pages";
import { DefaultLayout, GuestLayout } from "layouts";
import { ContextProvider, useStateContext } from "contexts/ContextProvider";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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

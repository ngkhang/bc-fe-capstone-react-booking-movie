import { HomePage, Login, PageNotFound, Register } from "@/pages";
import {
  AdminTemplate,
  AuthTemplate,
  DefaultTemplate,
  UserTemplate,
} from "@/templates";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: DefaultTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
    ],
  },
  {
    path: "auth",
    element: AuthTemplate,
    children: [
      {
        path: "login",
        element: Login,
      },
      {
        path: "register",
        element: Register,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
  },
  {
    path: "user",
    element: UserTemplate,
  },
  {
    path: "*",
    element: PageNotFound,
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (!route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }

    return (
      <Route
        key={route.path || "root-base"}
        path={route.path}
        element={<route.element />}
      >
        {route.children.map((item) => (
          <Route
            key={item.path || "root-base"}
            path={item.path}
            element={<item.element />}
          />
        ))}
      </Route>
    );
  });
};

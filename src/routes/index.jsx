import { HomePage, Login, PageNotFound, Register } from "@/pages";
import MovieDetail from "@/pages/MovieDetail";
import {
  AdminTemplate,
  AuthTemplate,
  DefaultTemplate,
  UserTemplate,
} from "@/templates";
import { Navigate, Route } from "react-router-dom";

const buildElement = (item) =>
  item.redirect ? <Navigate to={item.redirect} replace /> : <item.element />;

const routes = [
  {
    path: "",
    element: DefaultTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "movies/:maPhim",
        element: MovieDetail,
      },
    ],
  },
  {
    path: "auth",
    element: AuthTemplate,
    children: [
      {
        path: "",
        redirect: "login",
      },
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
        <Route
          key={route.path}
          path={route.path}
          element={buildElement(route)}
        />
      );
    }

    return (
      <Route
        key={route.path || "root-base"}
        path={route.path}
        element={buildElement(route)}
      >
        {route.children.map((item) =>
          item.path == "" ? (
            <Route
              key={`${route.path}-index`}
              index
              element={buildElement(item)}
            />
          ) : (
            <Route
              key={item.path}
              path={item.path}
              element={buildElement(item)}
            />
          ),
        )}
      </Route>
    );
  });
};

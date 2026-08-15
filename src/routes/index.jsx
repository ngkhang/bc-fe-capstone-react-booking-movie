import {
  AdminDashboard,
  BookingTicket,
  HomePage,
  Login,
  MovieDetail,
  MovieList,
  PageNotFound,
  ProfileSetting,
  Register,
  UserDashboard,
  UserManagement,
} from "@/pages";
import {
  AdminTemplate,
  AuthTemplate,
  DefaultTemplate,
  UserTemplate,
} from "@/templates";
import { Navigate, Route } from "react-router-dom";
import {
  AdminRoute,
  CustomerOnlyRoute,
  GuestOnlyRoute,
  ProtectedRoute,
} from "./guards";

const GUARDS = {
  protected: ProtectedRoute,
  guestOnly: GuestOnlyRoute,
  admin: AdminRoute,
  customerOnly: CustomerOnlyRoute,
};

const buildElement = (item) => {
  if (item.redirect) return <Navigate to={item.redirect} replace />;

  const Element = item.element;
  const guardNames = Array.isArray(item.guard)
    ? item.guard
    : item.guard
      ? [item.guard]
      : [];

  return guardNames.reduceRight(
    (content, name) => {
      const Guard = GUARDS[name];
      return <Guard>{content}</Guard>;
    },
    <Element />,
  );
};

const routes = [
  {
    path: "",
    element: DefaultTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
      { path: "movies/list-movie", element: MovieList },
      { path: "movies/:maPhim", element: MovieDetail },
      {
        path: "booking/:maLichChieu",
        element: BookingTicket,
        guard: "protected",
      },
    ],
  },
  {
    path: "auth",
    element: AuthTemplate,
    guard: "guestOnly",
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
    guard: "admin",
    children: [
      { path: "", redirect: "dashboard" },
      { path: "dashboard", element: AdminDashboard },
      { path: "user-management", element: UserManagement },
      { path: "profile", element: ProfileSetting },
    ],
  },
  {
    path: "user",
    element: UserTemplate,
    guard: ["protected", "customerOnly"],
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      { path: "dashboard", element: UserDashboard },
      { path: "profile", element: ProfileSetting },
    ],
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

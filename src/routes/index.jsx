import {
  AdminDashboard,
  BookingTicket,
  HomePage,
  Login,
  MovieDetail,
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
import { AdminRoute, GuestOnlyRoute, ProtectedRoute } from "./guards";

const GUARDS = {
  protected: ProtectedRoute,
  guestOnly: GuestOnlyRoute,
  admin: AdminRoute,
};

const buildElement = (item) => {
  if (item.redirect) return <Navigate to={item.redirect} replace />;

  const Element = item.element;
  let content = <Element />;

  if (item.guard) {
    const Guard = GUARDS[item.guard];
    content = <Guard>{content}</Guard>;
  }

  return content;
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
      {
        path: "movies/detail/:maPhim",
        element: MovieDetail,
      },
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
    guard: "protected",
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

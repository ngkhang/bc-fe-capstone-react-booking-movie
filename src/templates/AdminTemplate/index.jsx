import useRoute from "@/hooks/useRoute";
import { clearUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { name: "Dashboard", to: "/admin/dashboard" },
  { name: "Quản lý người dùng", to: "/admin/user-management" },
  { name: "Quản lý phim", to: "/admin/movie-management" },
  { name: "Quản lý rạp", to: "/admin/theater-management" },
  { name: "Hồ sơ", to: "/admin/profile" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminTemplate = () => {
  const dispatch = useDispatch();
  const { navigate } = useRoute();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className="flex min-h-full flex-col bg-gray-100">
      {/* <Header /> */}

      <main className="flex-1">
        <div className="mx-auto flex max-w-7xl gap-x-6 px-4 py-6 sm:px-6 lg:px-8">
          <aside className="w-64 flex-none">
            <p className="mb-2 px-1 text-xs font-semibold tracking-wide text-gray-400 uppercase">
              Quản trị viên
            </p>
            <nav className="flex flex-col gap-1 rounded-md bg-white p-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      "rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-100",
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-white px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </nav>
          </aside>

          <div className="min-w-0 flex-1 rounded-md bg-white p-6">
            <Outlet />
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default AdminTemplate;

import useRoute from "@/hooks/useRoute";
import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { SERVICES, STORAGE_KEY_USER } from "@/utils/constant";
import { setLocalStorage } from "@/utils/storage";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { navigate } = useRoute();
  const [formData, setFormData] = useState({ taiKhoan: "", matKhau: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { accessToken, ...userInfo } = await httpClient.post(
        API.QuanLyNguoiDung.DangNhap,
        formData,
      );
      setLocalStorage(SERVICES.ACCESS_TOKEN, accessToken);
      setLocalStorage(STORAGE_KEY_USER, userInfo);
      notifySuccess("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.content ||
        error?.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản/mật khẩu.";

      notifyError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="taiKhoan"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="taiKhoan"
                name="taiKhoan"
                type="text"
                required
                autoComplete="username"
                value={formData.taiKhoan}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="matKhau"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="matKhau"
                name="matKhau"
                type="password"
                required
                autoComplete="current-password"
                value={formData.matKhau}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/auth/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

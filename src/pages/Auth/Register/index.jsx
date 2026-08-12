import useRoute from "@/hooks/useRoute";
import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const { navigate } = useRoute();
  const [formData, setFormData] = useState({
    hoTen: "",
    taiKhoan: "",
    email: "",
    matKhau: "",
    soDt: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await httpClient.post(API.QuanLyNguoiDung.DangKy, formData);
      notifySuccess("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/auth/login");
    } catch (error) {
      const message =
        error?.response?.data?.content ||
        error?.response?.data?.message ||
        "Đăng ký thất bại. Vui lòng thử lại.";
      notifyError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Get started
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="hoTen"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Full name
            </label>
            <div className="mt-2">
              <input
                id="hoTen"
                name="hoTen"
                type="text"
                required
                autoComplete="name"
                value={formData.hoTen}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

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

          <div className="col-span-full">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="col-span-full">
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
                autoComplete="new-password"
                value={formData.matKhau}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="soDt"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Phone number
            </label>
            <div className="mt-2">
              <input
                id="soDt"
                name="soDt"
                type="text"
                required
                autoComplete="tel"
                value={formData.soDt}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already registered?{" "}
          <Link
            to="/auth/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>{" "}
          to your account.
        </p>
      </div>
    </div>
  );
};

export default Register;

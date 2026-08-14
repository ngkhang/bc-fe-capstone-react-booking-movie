import { selectUserInfo } from "@/store/slices/authSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileSetting = () => {
  const userInfo = useSelector(selectUserInfo);

  const [formData, setFormData] = useState({
    hoTen: userInfo?.hoTen ?? "",
    email: userInfo?.email ?? "",
    soDT: userInfo?.soDT ?? "",
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
      // TODO: Implement API Update profile
      console.log("submit profile update:", formData);
      notifySuccess("Cập nhật thông tin thành công!");
    } catch {
      notifyError("Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Thông tin cá nhân</h1>
        <p className="mt-1 text-sm text-gray-500">
          Cập nhật thông tin tài khoản của bạn.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-y-5">
        <div>
          <label
            htmlFor="taiKhoan"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Tài khoản
          </label>
          <div className="mt-2">
            <input
              id="taiKhoan"
              value={userInfo?.taiKhoan ?? ""}
              disabled
              className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="hoTen"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Họ tên
          </label>
          <div className="mt-2">
            <input
              id="hoTen"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="soDT"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Số điện thoại
          </label>
          <div className="mt-2">
            <input
              id="soDT"
              name="soDT"
              value={formData.soDT}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;

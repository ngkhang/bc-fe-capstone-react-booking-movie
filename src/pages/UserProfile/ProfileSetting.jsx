import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { setUser } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProfileSetting = () => {
  const dispatch = useDispatch();

  const [account, setAccount] = useState(null);
  const [formData, setFormData] = useState({ hoTen: "", email: "", soDt: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadAccount = async () => {
      setIsLoading(true);
      try {
        const res = await httpClient.post(API.QuanLyNguoiDung.ThongTinTaiKhoan);
        setAccount(res);
        setFormData({ hoTen: res.hoTen, email: res.email, soDt: res.soDT });
      } catch (error) {
        console.error("Failed to load account info:", error);
        toast.error("Không thể tải thông tin tài khoản.");
      } finally {
        setIsLoading(false);
      }
    };
    loadAccount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) return;

    setIsSubmitting(true);
    try {
      const body = {
        taiKhoan: account.taiKhoan,
        matKhau: account.matKhau,
        maNhom: account.maNhom,
        maLoaiNguoiDung: account.maLoaiNguoiDung,
        hoTen: formData.hoTen,
        email: formData.email,
        soDT: formData.soDt,
      };

      await httpClient.put(API.QuanLyNguoiDung.CapNhatThongTinNguoiDung, body);

      setAccount((prev) => ({ ...prev, ...body }));
      dispatch(setUser(body));
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error(
        error?.response?.data?.content ||
          "Cập nhật thất bại. Vui lòng thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return <p className="text-center py-10">Đang tải thông tin...</p>;

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
              value={account?.taiKhoan ?? ""}
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
              required
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
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="soDt"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Số điện thoại
          </label>
          <div className="mt-2">
            <input
              id="soDt"
              name="soDt"
              value={formData.soDt}
              onChange={handleChange}
              required
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

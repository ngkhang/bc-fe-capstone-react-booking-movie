import { GROUP_CODE } from "@/config/env";
import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { USER_ROLE } from "@/utils/constant";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EMPTY_FORM = {
  taiKhoan: "",
  matKhau: "",
  email: "",
  soDt: "",
  hoTen: "",
  maNhom: "",
  maLoaiNguoiDung: USER_ROLE.CUSTOMER,
};

const UserFormModal = ({
  isOpen,
  onClose,
  onSaved,
  editingUser,
  userTypes,
}) => {
  const isEditMode = Boolean(editingUser);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen)
      setFormData(editingUser ? { ...EMPTY_FORM, ...editingUser } : EMPTY_FORM);
  }, [isOpen, editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        const { soDt, ...rest } = formData;
        await httpClient.put(API.QuanLyNguoiDung.CapNhatThongTinNguoiDung, {
          ...rest,
          soDT: soDt,
          maNhom: GROUP_CODE,
        });

        toast.success("Cập nhật tài khoản thành công!");
      } else {
        await httpClient.post(API.QuanLyNguoiDung.ThemNguoiDung, formData);
        toast.success("Thêm tài khoản thành công!");
      }
      onSaved();
    } catch (error) {
      toast.error(
        error?.response?.data?.content || "Có lỗi xảy ra. Vui lòng thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {isEditMode
              ? `Sửa tài khoản: ${editingUser.taiKhoan}`
              : "Thêm tài khoản mới"}
          </DialogTitle>

          <form
            onSubmit={handleSubmit}
            className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Tài khoản
              </label>
              <input
                name="taiKhoan"
                value={formData.taiKhoan}
                onChange={handleChange}
                disabled={isEditMode}
                required
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Mật khẩu
              </label>
              <input
                name="matKhau"
                type="password"
                value={formData.matKhau}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Họ tên
              </label>
              <input
                name="hoTen"
                value={formData.hoTen}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Số điện thoại
              </label>
              <input
                name="soDt"
                value={formData.soDt}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Mã nhóm
              </label>
              <input
                name="maNhom"
                value={formData.maNhom ?? ""}
                onChange={handleChange}
                placeholder="GP00"
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-sm/6 font-medium text-gray-900">
                Loại người dùng
              </label>
              <select
                name="maLoaiNguoiDung"
                value={formData.maLoaiNguoiDung}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
                {userTypes.map((type) => (
                  <option
                    key={type.maLoaiNguoiDung}
                    value={type.maLoaiNguoiDung}
                  >
                    {type.tenLoai}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-full mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Đang lưu..."
                  : isEditMode
                    ? "Cập nhật"
                    : "Thêm mới"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UserFormModal;

import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { useEffect, useState } from "react";
import UserFormModal from "./UserFormModal";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/slices/authSlice";

const PAGE_SIZE = 20;

const UserManagement = () => {
  const [pageData, setPageData] = useState({
    items: [],
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userTypes, setUserTypes] = useState([]);
  const currentTaiKhoan = useSelector(selectUserInfo)?.taiKhoan;

  useEffect(() => {
    httpClient
      .get(API.QuanLyNguoiDung.LayDanhSachLoaiNguoiDung)
      .then((res) => setUserTypes(res ?? []))
      .catch((error) => console.error("Failed to load user types:", error));
  }, []);

  const loadUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await httpClient.get(
        API.QuanLyNguoiDung.LayDanhSachNguoiDungPhanTrang(page, PAGE_SIZE),
      );
      setPageData(res);
    } catch (error) {
      console.error("Failed to load users:", error);
      notifyError("Không thể tải danh sách người dùng.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(1);
  }, []);

  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (taiKhoan) => {
    if (
      !window.confirm(
        `Xóa tài khoản "${taiKhoan}"? Hành động này không thể hoàn tác.`,
      )
    )
      return;
    try {
      await httpClient.delete(API.QuanLyNguoiDung.XoaNguoiDung(taiKhoan));
      notifySuccess("Đã xóa tài khoản.");
      loadUsers(pageData.currentPage);
    } catch (error) {
      notifyError(
        error?.response?.data?.content || "Xóa thất bại. Vui lòng thử lại.",
      );
    }
  };
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Quản lý người dùng
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {pageData.totalCount} tài khoản
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          + Thêm tài khoản
        </button>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-100">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Tài khoản
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Họ tên
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                SĐT
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Loại
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  Đang tải...
                </td>
              </tr>
            ) : pageData.items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  Chưa có tài khoản nào.
                </td>
              </tr>
            ) : (
              pageData.items.map((user) => (
                <tr key={user.taiKhoan}>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {user.taiKhoan}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {user.hoTen}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {user.soDt}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {user.maLoaiNguoiDung}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setIsModalOpen(true);
                      }}
                      className="mr-3 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user.taiKhoan)}
                      className="mr-3 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageData.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={pageData.currentPage <= 1}
            onClick={() => loadUsers(pageData.currentPage - 1)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Trước
          </button>
          <span className="text-sm text-gray-500">
            Trang {pageData.currentPage} / {pageData.totalPages}
          </span>
          <button
            disabled={pageData.currentPage >= pageData.totalPages}
            onClick={() => loadUsers(pageData.currentPage + 1)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sau
          </button>
        </div>
      )}

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={() => {
          setIsModalOpen(false);
          loadUsers(pageData.currentPage);
        }}
        editingUser={editingUser}
        userTypes={userTypes}
      />
    </div>
  );
};

export default UserManagement;

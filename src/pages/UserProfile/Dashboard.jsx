import { selectUserInfo } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Xin chào, {userInfo?.hoTen}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Đây là trang tổng quan tài khoản của bạn.
        </p>
      </div>

      <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
        Lịch sử đặt vé sẽ hiển thị ở đây khi có API tương ứng.
      </div>
    </div>
  );
};

export default UserDashboard;

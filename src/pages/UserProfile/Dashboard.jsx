import { httpClient } from "@/services/httpClient";
import { selectUserInfo } from "@/store/slices/authSlice";
import { API } from "@/utils/apiUrl";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BookingCard from "./BookingCard";

const UserDashboard = () => {
  const userInfo = useSelector(selectUserInfo);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      try {
        const res = await httpClient.post(API.QuanLyNguoiDung.ThongTinTaiKhoan);
        setBookings(res?.thongTinDatVe ?? []);
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBookings();
  }, []);

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

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Lịch sử đặt vé {bookings.length > 0 && `(${bookings.length})`}
        </h2>

        {isLoading ? (
          <p className="text-sm text-gray-500">Đang tải...</p>
        ) : bookings.length === 0 ? (
          <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
            Bạn chưa có vé nào.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings
              .slice()
              .sort((a, b) => new Date(b.ngayDat) - new Date(a.ngayDat))
              .map((booking) => (
                <BookingCard key={booking.maVe} booking={booking} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

import { formatCurrency, formatDateTime } from "@/utils/helper";

const BookingCard = ({ booking }) => (
  <div className="flex gap-4 rounded-md border border-gray-100 p-4">
    <img
      src={booking.hinhAnh}
      alt={booking.tenPhim}
      className="h-28 w-20 flex-none rounded-md object-cover"
    />

    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <p className="font-semibold text-gray-900">{booking.tenPhim}</p>
      <p className="text-xs text-gray-500">Mã vé: {booking.maVe}</p>
      <p className="text-xs text-gray-500">
        Đặt lúc: {formatDateTime(booking.ngayDat)}
      </p>
      <p className="text-sm text-gray-700">
        {booking.danhSachGhe[0]?.tenCumRap} — {booking.danhSachGhe[0]?.tenRap}
      </p>
      <p className="text-sm text-gray-700">
        Ghế: {booking.danhSachGhe.map((ghe) => ghe.tenGhe).join(", ")}
      </p>
      <p className="text-sm text-gray-700">
        Giá vé: {formatCurrency(booking.giaVe)}đ · {booking.thoiLuongPhim} phút
      </p>
    </div>
  </div>
);

export default BookingCard;

import {
  delAllSeat,
  selectedSeats,
  selectThongTinPhim,
  selectTotalPrice,
} from "@/store/slices/bookingSlice";
import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { formatCurrency } from "@/utils/helper";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRoute from "@/hooks/useRoute";

const BookingSideBar = () => {
  const dispatch = useDispatch();
  const { navigate } = useRoute();
  const seats = useSelector(selectedSeats);
  const totalPrice = useSelector(selectTotalPrice);
  const thongTinPhim = useSelector(selectThongTinPhim);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClearSeat = () => dispatch(delAllSeat());

  const handleBookingSeat = async () => {
    if (!seats.length) {
      notifyError("Vui lòng chọn ghế");
      return;
    }

    setIsSubmitting(true);
    try {
      await httpClient.post(API.QuanLyDatVe.DatVe, {
        maLichChieu: thongTinPhim.maLichChieu,
        danhSachVe: seats.map((seat) => ({
          maGhe: seat.maGhe,
          giaVe: seat.giaVe,
        })),
      });

      notifySuccess("Đặt vé thành công");
      dispatch(delAllSeat());
      navigate("/user/dashboard");
    } catch (error) {
      notifyError(
        error?.response?.data?.content || "Đặt vé thất bại. Vui lòng thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 border border-default rounded-base shadow-xs">
      <h2 className="text-center uppercase font-semibold leading-8 mb-3">
        Thông tin đặt ghế
      </h2>

      <div className="grid grid-cols-3 mb-5">
        <span className="col-span-1 font-medium">Ghế</span>
        {seats.length > 0 && (
          <div className="col-span-2 text-end flex justify-end items-center">
            <span>{seats.map((seat) => seat.tenGhe).join(", ")}</span>
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center text-white bg-danger hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs rounded-base w-8 h-8 focus:outline-none"
              onClick={handleClearSeat}
            >
              <svg
                className="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              <span className="sr-only">Clear all seat</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="font-medium">Tạm tính</span>
          <span>{formatCurrency(totalPrice)} VNĐ</span>
        </div>

        <button
          className="bg-primary text-white rounded-md inline-block px-7 py-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleBookingSeat}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đặt..." : "Đặt vé"}
        </button>
      </div>
    </div>
  );
};

export default BookingSideBar;

import useRoute from "@/hooks/useRoute";
import BookingSideBar from "./BookingSideBar";
import Screen from "./Screen";
import SeatDescription from "./SeatDescription";
import SeatMap from "./SeatMap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectThongTinPhim,
  setBookingData,
} from "@/store/slices/bookingSlice";
import { useState, useEffect } from "react";
import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";

const BookingTicket = () => {
  const { maLichChieu } = useRoute().param;
  const dispatch = useDispatch();
  const thongTinPhim = useSelector(selectThongTinPhim);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSeats = async () => {
      setIsLoading(true);
      try {
        const res = await httpClient.get(
          API.QuanLyDatVe.LayDanhSachPhongVe(maLichChieu),
        );
        dispatch(setBookingData(res));
      } catch (error) {
        console.error("Failed to load seat map:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (maLichChieu) loadSeats();
  }, [maLichChieu, dispatch]);

  if (isLoading)
    return <p className="text-center py-10">Đang tải sơ đồ ghế...</p>;

  return (
    <div className="flex items-center justify-center md:p-5">
      <div className="container grid md:grid-cols-6 gap-4">
        <div className="col-span-full md:col-span-4 text-light">
          <div className="bg-primary text-center py-3 rounded-t-base">
            <h2 className="uppercase font-semibold">
              {thongTinPhim?.tenPhim ?? "Booking Seat"}
            </h2>
            {thongTinPhim && (
              <p className="text-sm mt-1">
                {thongTinPhim.tenCumRap} — {thongTinPhim.tenRap} ·{" "}
                {thongTinPhim.ngayChieu} {thongTinPhim.gioChieu}
              </p>
            )}
          </div>

          <div className="bg-dark py-5 rounded-b-base">
            <div className="mb-3">
              <Screen />
            </div>

            <div className="mb-5 overflow-x-auto">
              <SeatMap />
            </div>

            <div>
              <SeatDescription />
            </div>
          </div>
        </div>

        <div className="col-span-full md:col-span-2">
          <BookingSideBar />
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;

import { delAllSeat, selectedSeats } from "@/store/slices/bookingSlice";
import { formatCurrency } from "@/utils/helper";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BookingSideBar = () => {
  const dispatch = useDispatch();
  const seats = useSelector(selectedSeats);

  const getTotalPrice = () => {
    return 0;
  };

  const handleClearSeat = () => {
    dispatch(delAllSeat());
  };

  const handleBookingSeat = () => {
    if (!seats.length) {
      notifyError("Vui lòng chọn ghế");
      return;
    }

    notifySuccess("Đặt vé thành công");
    dispatch(delAllSeat());
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
            <span>{seats.map((seat) => seat.soGhe).join(", ")}</span>
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
          <span>
            {formatCurrency(seats.length > 0 ? getTotalPrice(seats) : 0)} VNĐ
          </span>
        </div>

        <button
          className="bg-primary text-white rounded-md inline-block px-7 py-3 cursor-pointer"
          onClick={handleBookingSeat}
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
};

export default BookingSideBar;

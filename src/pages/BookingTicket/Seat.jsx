import { addSeat, selectedSeats } from "@/store/slices/bookingSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Seat = ({ seat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(selectedSeats);

  const handleToggleSeat = () => {
    dispatch(addSeat({ seat }));
  };

  const getStyle = () => {
    if (seat.daDat) return "seat-block";

    const isChoosing = seats.some((item) => item.maGhe === seat.maGhe);
    if (isChoosing) return "seat-booking";

    return seat.loaiGhe === "Vip" ? "seat-vip" : "seat-empty";
  };

  return (
    <button
      type="button"
      className={`flex h-9 w-9 items-center justify-center rounded border-2 border-transparent text-xs text-white ${getStyle()}`}
      disabled={seat.daDat}
      onClick={handleToggleSeat}
    >
      {seat.tenGhe}
    </button>
  );
};

export default Seat;

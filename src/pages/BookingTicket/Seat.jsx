import { addSeat, selectedSeats } from "@/store/slices/bookingSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Seat = (props) => {
  const dispatch = useDispatch();
  const seats = useSelector(selectedSeats);

  const { seat } = props;

  const handleAddTicket = (seat) => {
    dispatch(addSeat({ seat }));
  };

  const getStyle = (daDat) => {
    if (daDat) return "seat-block";

    const isChoosing =
      seats.findIndex((item) => item.soGhe === seat.soGhe) !== -1;

    if (isChoosing) return "seat-booking";
    return "seat-empty";
  };

  return (
    <button
      className={`text-xs text-white border-2 border-transparent rounded p-2 inline-block ${getStyle(seat.daDat)}`}
      disabled={seat.daDat}
      onClick={() => handleAddTicket(seat)}
    >
      {seat.soGhe}
    </button>
  );
};

export default Seat;

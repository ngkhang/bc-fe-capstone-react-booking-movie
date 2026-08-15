import { selectAllSeats } from "@/store/slices/bookingSlice";
import { useSelector } from "react-redux";
import Seat from "./Seat";

const SEATS_PER_ROW = 15;

const chunkIntoRows = (seats, size) => {
  const sorted = [...seats].sort((a, b) => Number(a.stt) - Number(b.stt));
  const rows = [];
  for (let i = 0; i < sorted.length; i += size) {
    rows.push(sorted.slice(i, i + size));
  }
  return rows;
};

const SeatMap = () => {
  const allSeats = useSelector(selectAllSeats);

  if (!allSeats || allSeats.length === 0) {
    return <p className="text-light text-center">Danh sách trống</p>;
  }

  const rows = chunkIntoRows(allSeats, SEATS_PER_ROW);

  return (
    <div className="flex w-max flex-col items-center gap-2 px-3 mx-auto">
      {rows.map((rowSeats, index) => (
        <div key={index} className="flex items-center justify-center gap-2">
          {rowSeats.map((seat) => (
            <Seat key={seat.maGhe} seat={seat} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;

import Seat from "./Seat";
import SeatLabel from "./SeatLabel";
import mockData from "@/data.json";

const SeatMap = () => {
  return (
    <div className="grid gap-2 p-3 pr-6">
      {mockData && mockData.length > 0 ? (
        mockData.map((row) => {
          return (
            <div key={row.hang} className="grid grid-flow-col-dense gap-2">
              <SeatLabel>{row.hang}</SeatLabel>

              {row.danhSachGhe.map((seat) =>
                seat.daDat === undefined ? (
                  <SeatLabel key={seat.soGhe}>{seat.soGhe}</SeatLabel>
                ) : (
                  <Seat key={seat.soGhe} seat={seat} />
                ),
              )}
            </div>
          );
        })
      ) : (
        <p>Danh sách trống</p>
      )}
    </div>
  );
};

export default SeatMap;

import BookingSideBar from "./BookingSideBar";
import Screen from "./Screen";
import SeatDescription from "./SeatDescription";
import SeatMap from "./SeatMap";

const BookingTicket = () => {
  return (
    <div className="flex items-center justify-center md:p-5">
      <div className="container grid md:grid-cols-5 gap-4">
        {/* Left */}
        <div className="col-span-3 text-light">
          {/* Title */}
          <div className="bg-primary text-center py-3 rounded-t-base">
            <h2 className="uppercase font-semibold">Booking Seat</h2>
          </div>

          {/* Body */}
          <div className="bg-dark py-5 rounded-b-base">
            {/* Screen */}
            <div className="mb-3">
              <Screen />
            </div>

            {/* Seat Mapping */}
            <div className="mb-3">
              <SeatMap />
            </div>

            {/* Seat Description */}
            <div className="">
              <SeatDescription />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-2">
          <BookingSideBar />
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;

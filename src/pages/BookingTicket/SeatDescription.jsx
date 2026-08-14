import { infoSeat } from "@/utils/constant";

const SeatDescription = () => {
  return (
    <div className="flex justify-center items-center text-sm">
      {infoSeat.map((item) => {
        return (
          <div key={item.id} className="flex items-center mr-5 gap-1">
            <span className={`w-7 h-7 rounded shrink-0 ${item.className}`} />
            <span>{item.content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SeatDescription;

import useRoute from "@/hooks/useRoute";
import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { formatCurrency, formatDateTime } from "@/utils/helper";
import { useEffect, useState } from "react";

const MovieShowtimeSelector = ({ maPhim, onSelect }) => {
  const { navigate } = useRoute();
  const [theaterSystems, setTheaterSystems] = useState([]);
  const [selectedSystemIndex, setSelectedSystemIndex] = useState(0);
  const [selectedTheaterIndex, setSelectedTheaterIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadShowtimes = async () => {
      setIsLoading(true);
      try {
        const res = await httpClient.get(
          API.QuanLyRap.LayThongTinLichChieuPhim(maPhim),
        );
        setTheaterSystems(res?.heThongRapChieu ?? []);
        setSelectedSystemIndex(0);
        setSelectedTheaterIndex(0);
      } catch (error) {
        console.error("Failed to load showtimes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (maPhim) loadShowtimes();
  }, [maPhim]);

  const handleSelectShowtime = (maLichChieu) => {
    if (onSelect) onSelect(maLichChieu);
    else navigate(`/booking/${maLichChieu}`);
  };

  if (isLoading)
    return (
      <p className="py-6 text-center text-sm text-gray-500">
        Đang tải lịch chiếu...
      </p>
    );

  if (theaterSystems.length === 0) {
    return (
      <div className="w-full rounded-md bg-white p-4 text-center">
        <p>Hiện chưa có lịch chiếu cho phim này.</p>
      </div>
    );
  }

  const currentSystem = theaterSystems[selectedSystemIndex];
  const currentTheaters = currentSystem?.cumRapChieu ?? [];
  const currentTheater = currentTheaters[selectedTheaterIndex];

  return (
    <div className="flex gap-x-4">
      <div className="flex flex-col gap-2 rounded-md bg-white p-4">
        {theaterSystems.map(({ maHeThongRap, logo, tenHeThongRap }, index) => (
          <div
            key={maHeThongRap}
            className={`cursor-pointer rounded-sm p-3 ${
              selectedSystemIndex === index ? "bg-gray-100" : "bg-transparent"
            }`}
            onClick={() => {
              setSelectedSystemIndex(index);
              setSelectedTheaterIndex(0);
            }}
          >
            <img
              alt={tenHeThongRap}
              src={logo}
              className="inline-block size-12 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
            />
          </div>
        ))}
      </div>

      <div className="grid w-full grid-cols-3 gap-x-10 rounded-md bg-white p-4">
        <ul role="list" className="divide-y divide-gray-100">
          {currentTheaters.map((theater, index) => (
            <li
              key={theater.maCumRap}
              className={`cursor-pointer rounded-sm p-2 py-5 ${
                selectedTheaterIndex === index
                  ? "bg-gray-100"
                  : "bg-transparent"
              }`}
              onClick={() => setSelectedTheaterIndex(index)}
            >
              <p className="text-sm/6 font-semibold text-gray-900">
                {theater.tenCumRap}
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                {theater.diaChi}
              </p>
            </li>
          ))}
        </ul>

        <div className="col-span-2 flex flex-col gap-y-3">
          {currentTheater && currentTheater.lichChieuPhim?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {currentTheater.lichChieuPhim.map((show) => (
                <button
                  key={show.maLichChieu}
                  className="flex flex-col items-start rounded-md bg-gray-100 px-3 py-2 text-sm hover:bg-indigo-100"
                  onClick={() => handleSelectShowtime(show.maLichChieu)}
                >
                  <span className="font-medium text-gray-900">
                    {show.tenRap} — {formatDateTime(show.ngayChieuGioChieu)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatCurrency(show.giaVe)} · {show.thoiLuong} phút
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center">Rạp này hiện chưa có lịch chiếu.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieShowtimeSelector;

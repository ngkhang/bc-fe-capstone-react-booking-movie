import useRoute from "@/hooks/useRoute";
import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  getYoutubeEmbedUrl,
} from "@/utils/helper";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const { param, navigate } = useRoute();
  const { maPhim } = param;
  const [movie, setMovie] = useState(null);
  const [theaterSystems, setTheaterSystems] = useState([]);
  const [selectedSystemIndex, setSelectedSystemIndex] = useState(0);
  const [selectedTheaterIndex, setSelectedTheaterIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const [movieRes, showtimeRes] = await Promise.all([
          httpClient.get(API.QuanLyPhim.LayThongTinPhim(maPhim)),
          httpClient.get(API.QuanLyRap.LayThongTinLichChieuPhim(maPhim)),
        ]);

        setMovie(movieRes);
        setTheaterSystems(showtimeRes?.heThongRapChieu ?? []);
        setSelectedSystemIndex(0);
        setSelectedTheaterIndex(0);
      } catch (error) {
        console.error("Failed to load movie detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (maPhim) fetchMovieDetail();
  }, [maPhim]);

  const handleSelectSystem = (index) => {
    setSelectedSystemIndex(index);
    setSelectedTheaterIndex(0);
  };

  if (isLoading) {
    return <p className="text-center py-10">Đang tải thông tin phim...</p>;
  }

  if (!movie) {
    return <p className="text-center py-10">Không tìm thấy phim.</p>;
  }

  const currentSystem = theaterSystems[selectedSystemIndex];
  const currentTheaters = currentSystem?.cumRapChieu ?? [];
  const currentTheater = currentTheaters[selectedTheaterIndex];
  const embedUrl = getYoutubeEmbedUrl(movie.trailer);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-6 rounded-md bg-white p-4 md:flex-row">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="h-96 w-full flex-none rounded-md object-cover md:w-64 md:h-100 lg:w-80"
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {movie.tenPhim}
            </h1>
            {movie.hot && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                HOT
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {movie.dangChieu ? "Đang chiếu" : movie.sapChieu ? "Sắp chiếu" : ""}
            {movie.ngayKhoiChieu &&
              ` · Khởi chiếu: ${formatDate(movie.ngayKhoiChieu)}`}
          </p>

          {typeof movie.danhGia === "number" && (
            <p className="text-sm text-gray-500">
              Đánh giá: {movie.danhGia}/10
            </p>
          )}

          <p className="text-sm/6 text-gray-700">{movie.moTa}</p>

          {embedUrl && (
            <div className="aspect-video w-full max-w-2xl overflow-hidden rounded-md">
              <iframe
                src={embedUrl}
                title={`${movie.tenPhim} trailer`}
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-x-4">
        {theaterSystems.length === 0 ? (
          <div className="w-full rounded-md bg-white p-4 text-center">
            <p>Hiện chưa có lịch chiếu cho phim này.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 rounded-md bg-white p-4">
              {theaterSystems.map(
                ({ maHeThongRap, logo, tenHeThongRap }, index) => (
                  <div
                    key={maHeThongRap}
                    className={`cursor-pointer rounded-sm p-3 ${
                      selectedSystemIndex === index
                        ? "bg-gray-100"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSelectSystem(index)}
                  >
                    <img
                      alt={tenHeThongRap}
                      src={logo}
                      className="inline-block size-12 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
                    />
                  </div>
                ),
              )}
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
                        onClick={() => navigate(`/booking/${show.maLichChieu}`)}
                      >
                        <span className="font-medium text-gray-900">
                          {show.tenRap} -{" "}
                          {formatDateTime(show.ngayChieuGioChieu)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatCurrency(show.giaVe)} · {show.thoiLuong} phút
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center">
                    Rạp này hiện chưa có lịch chiếu.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;

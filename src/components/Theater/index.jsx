import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { formatDate } from "@/utils/helper";
import { useEffect } from "react";
import { useState } from "react";

const fetchMovieShowTimes = async (codeTheaterSystem) =>
  await httpClient.get(
    API.QuanLyRap.LayThongTinLichChieuHeThongRap(codeTheaterSystem),
  );

const getShowingMovies = (danhSachPhim) =>
  danhSachPhim.filter((item) => item.dangChieu === true);

const Theater = () => {
  const [listTheaterSystems, setListTheaterSystems] = useState([]);
  const [listMovieShowtime, setListMovieShowtime] = useState([]);
  const [listMovie, setListMovie] = useState([]);
  const [selectedTheaterSystem, setSelectedTheaterSystem] = useState("");
  const [selectedTheater, setSelectedTheater] = useState(null);

  useEffect(() => {
    const getListTheaterSystems = async () => {
      const res = await httpClient.get(API.QuanLyRap.LayThongTinHeThongRap);
      setListTheaterSystems(res);

      if (res && res.length !== 0) {
        const codeTheaterSystem = res[0].maHeThongRap;
        const movieShowTimes = await fetchMovieShowTimes(codeTheaterSystem);

        setSelectedTheaterSystem(codeTheaterSystem);
        setListMovieShowtime(movieShowTimes);

        if (movieShowTimes?.length && movieShowTimes[0].lstCumRap?.length) {
          setSelectedTheater(0);
          setListMovie(
            getShowingMovies(movieShowTimes[0].lstCumRap[0].danhSachPhim),
          );
        }
      }
    };

    getListTheaterSystems();
  }, []);

  const handleChangeTheaterSystem = async (codeTheaterSystem) => {
    setSelectedTheaterSystem(codeTheaterSystem);
    const movieShowTimes = await fetchMovieShowTimes(codeTheaterSystem);
    setListMovieShowtime(movieShowTimes);

    if (movieShowTimes?.length && movieShowTimes[0].lstCumRap?.length) {
      setSelectedTheater(0);
      setListMovie(
        getShowingMovies(movieShowTimes[0].lstCumRap[0].danhSachPhim),
      );
    }
  };

  const handleChangeListMovie = (index) => {
    setSelectedTheater(index);
    const danhSachPhim = listMovieShowtime[0].lstCumRap[index].danhSachPhim;
    setListMovie(getShowingMovies(danhSachPhim));
  };

  return (
    <div className="flex gap-x-4">
      {/* Hệ thống rạp phim*/}
      <div className="bg-white flex flex-col gap-2 p-4 rounded-md">
        {listTheaterSystems.map(({ maHeThongRap, logo, tenHeThongRap }) => {
          return (
            <div
              className={`p-3 rounded-sm cursor-pointer ${selectedTheaterSystem === maHeThongRap ? "bg-gray-100" : "bg-transparent"}`}
              onClick={() => handleChangeTheaterSystem(maHeThongRap)}
            >
              <img
                alt={tenHeThongRap}
                src={logo}
                className="inline-block size-12 rounded-full ..."
              />
            </div>
          );
        })}
      </div>

      {/* Lịch chiếu hệ thống rạp phim */}
      <div className="grid grid-cols-3 gap-x-10 bg-white w-full p-4 rounded-md">
        {listMovieShowtime && listMovieShowtime.length !== 0 ? (
          <>
            {/* Rạp phim */}
            <ul role="list" className="divide-y divide-gray-100">
              {listMovieShowtime[0].lstCumRap.map((theater, index) => (
                <li
                  key={theater.maCumRap}
                  className={`flex justify-between gap-x-6 p-2 py-5 rounded-sm ${selectedTheater === index ? "bg-gray-100" : "bg-transparent"}`}
                  onClick={() => handleChangeListMovie(index)}
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      alt={listMovieShowtime[0].tenHeThongRap}
                      src={listMovieShowtime[0].logo}
                      className="size-10 flex-none rounded-full bg-gray-50"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {theater.tenCumRap}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {theater.diaChi}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Lịch chiếu */}
            <div className="col-span-2 flex flex-col gap-y-3">
              {listMovie && listMovie.length !== 0 ? (
                <ul role="list" className="divide-y divide-gray-100">
                  {listMovie.map((movie) => {
                    return (
                      <li
                        key={movie.maPhim}
                        className={`flex flex-col gap-x-6 p-2 py-5 rounded-sm `}
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            alt={movie.maPhim}
                            src={movie.hinhAnh}
                            className="w-24 h-30 flex-none rounded-md bg-gray-50"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-xl font-semibold text-gray-900">
                              {movie.tenPhim}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 text-xs/5 text-gray-500 flex flex-wrap gap-3">
                          {movie.lstLichChieuTheoPhim.map((show) => {
                            return (
                              <button
                                key={show.maLichChieu}
                                className="bg-gray-100 rounded-md py-1 px-2"
                                onClick={() => console.log(show.maLichChieu)}
                              >
                                <span>{show.tenRap}</span> -
                                <span>
                                  {formatDate(show.ngayChieuGioChieu)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center">
                  <p>Hiện tại chưa có lịch chiếu</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Hiện chưa có thông tin chiếu phim</p>
        )}
      </div>
    </div>
  );
};

export default Theater;

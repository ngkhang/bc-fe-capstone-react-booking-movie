import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const BannerMovie = () => {
  const [bannerMovies, setBannerMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const getListBanner = async () => {
      const res = await httpClient.get(API.QuanLyPhim.LayDanhSachBanner);
      setBannerMovies(res);
    };

    getListBanner();
  }, []);

  useEffect(() => {
    if (bannerMovies.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bannerMovies.length);
    }, 5000);
    return () => clearInterval(id);
  }, [bannerMovies.length]);

  const goTo = (index) =>
    setActiveIndex((index + bannerMovies.length) % bannerMovies.length);

  if (bannerMovies.length === 0) return null;

  return (
    <div className="relative h-56 overflow-hidden rounded-lg sm:h-64 xl:h-80 2xl:h-96">
      {bannerMovies.map(({ maPhim, hinhAnh, maBanner }, index) => (
        <img
          key={maPhim}
          src={hinhAnh}
          alt={maBanner}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <button
        type="button"
        onClick={() => goTo(activeIndex - 1)}
        className="absolute left-0 top-0 flex h-full items-center px-4"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
      <button
        type="button"
        onClick={() => goTo(activeIndex + 1)}
        className="absolute right-0 top-0 flex h-full items-center px-4"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3">
        {bannerMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-3 w-3 rounded-full ${index === activeIndex ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerMovie;

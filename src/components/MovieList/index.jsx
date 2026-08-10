import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { MovieItem } from "./MovieItem";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [bannerMovies, setBannerMovies] = useState([]);

  useEffect(() => {
    const getListBanner = async () => {
      const res = await httpClient.get(
        API.QuanLyPhim.LayDanhSachPhimPhanTrang(1, 8),
      );
      setBannerMovies(res.items);
    };

    getListBanner();
  }, []);

  return (
    <>
      <div className="bg-white rounded-md mb-10">
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-16 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 mb-4 sm:mb-8">
            List Movie
          </h1>

          {bannerMovies && bannerMovies.length === 0 ? (
            <p className="text-center text-gray-400 text-xl">
              Empty Movie. Back to soon
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {bannerMovies.map((movie) => (
                <MovieItem key={movie.maPhim} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>

      {bannerMovies && bannerMovies.length !== 0 && (
        <div className="flex justify-center">
          {/* TODO: implement List Movie page */}
          <Link to={""} className="w-full sm:w-1/2 lg:w-1/3">
            <Button className="w-full">View more movies</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default MovieList;

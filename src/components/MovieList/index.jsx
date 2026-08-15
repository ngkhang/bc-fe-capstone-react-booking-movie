import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { MovieItem } from "./MovieItem";

const MovieList = ({
  title,
  movies,
  emptyMessage = "Hiện chưa có phim nào.",
  viewMoreTo,
  isComingSoon = false,
}) => {
  return (
    <div className="bg-white rounded-md p-4 sm:p-8">
      {title && (
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900 mb-4 sm:mb-8">
          {title}
        </h2>
      )}

      {!movies || movies.length === 0 ? (
        <p className="text-center text-gray-400 text-xl">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {movies.map((movie) => (
            <MovieItem
              key={movie.maPhim}
              movie={movie}
              isComingSoon={isComingSoon}
            />
          ))}
        </div>
      )}

      {viewMoreTo && movies && movies.length !== 0 && (
        <div className="mt-10 flex justify-center">
          <Link to={viewMoreTo} className="w-full sm:w-1/2 lg:w-1/3">
            <Button className="w-full">Xem thêm phim</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieList;

import ShowtimeModal from "@/components/ShowtimeModal";
import { getYoutubeEmbedUrl } from "@/utils/helper";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TrailerModal from "@/components/TrailerModel";

export function MovieItem({ movie, isComingSoon = false }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isShowtimeOpen, setIsShowtimeOpen] = useState(false);
  const { danhGia, hinhAnh, maPhim, tenPhim, trailer, biDanh } = movie;

  const hasTrailer = Boolean(getYoutubeEmbedUrl(trailer));

  return (
    <div className="group flex flex-col">
      <button
        type="button"
        onClick={() => hasTrailer && setIsTrailerOpen(true)}
        className="group relative h-96 w-full flex-none overflow-hidden rounded-md md:w-64"
      >
        <img
          src={hinhAnh}
          alt={biDanh}
          className="h-full w-full object-cover"
        />
        {hasTrailer && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
            <PlayCircleIcon className="size-14 text-white opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
        )}
      </button>

      <Link to={`/movies/${maPhim}`} className="mb-1.5">
        <h3 className="mt-4 text-sm font-bold text-gray-700">{tenPhim}</h3>
      </Link>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="text-lg font-medium text-gray-900">{danhGia}</p>
        </div>

        {!isComingSoon && (
          <Button
            className="cursor-pointer"
            onClick={() => setIsShowtimeOpen(true)}
          >
            Booking now
          </Button>
        )}
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={trailer}
        title={tenPhim}
      />

      {!isComingSoon && (
        <ShowtimeModal
          isOpen={isShowtimeOpen}
          onClose={() => setIsShowtimeOpen(false)}
          movie={movie}
        />
      )}
    </div>
  );
}

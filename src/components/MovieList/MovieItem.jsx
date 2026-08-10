import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

export function MovieItem(props) {
  const { danhGia, hinhAnh, maPhim, tenPhim, trailer, biDanh } = props.movie;
  return (
    <div className="group flex flex-col">
      <Link to={trailer} className="relative">
        <img
          alt={biDanh}
          src={hinhAnh}
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
        />

        <PlayCircleIcon className="absolute max-w-xs opacity-0 group-hover:opacity-75 group-hover:visible text-gray-100 size-1/3 top-1/2 left-1/2 -translate-1/2" />
      </Link>

      {/* TODO: Implement to movie detail */}
      <Link to={maPhim} className="mb-1.5">
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

        <Button className="cursor-pointer">Booking now</Button>
      </div>
    </div>
  );
}

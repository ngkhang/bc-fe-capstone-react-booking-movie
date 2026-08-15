import MovieShowtimeSelector from "@/components/MovieShowtimeSelector";
import useRoute from "@/hooks/useRoute";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ShowtimeModal = ({ isOpen, onClose, movie }) => {
  const { navigate } = useRoute();

  const handleSelect = (maLichChieu) => {
    onClose();
    navigate(`/booking/${maLichChieu}`);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Chọn suất chiếu — {movie?.tenPhim}
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          {movie && (
            <MovieShowtimeSelector
              maPhim={movie.maPhim}
              onSelect={handleSelect}
            />
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ShowtimeModal;

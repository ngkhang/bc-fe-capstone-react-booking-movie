import { getYoutubeEmbedUrl } from "@/utils/helper";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
const TrailerModal = ({ isOpen, onClose, trailerUrl, title }) => {
  const embedUrl = getYoutubeEmbedUrl(trailerUrl);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/70" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title ? `Trailer: ${title}` : "Trailer"}
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="aspect-video w-full bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title ? `${title} trailer` : "Movie trailer"}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white">
                Trailer không khả dụng.
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TrailerModal;

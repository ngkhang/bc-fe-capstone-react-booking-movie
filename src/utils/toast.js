import { toast } from "react-toastify";

const buildToastOptions = (options = {}) => {
  return {
    position: "bottom-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  };
};

export const notifySuccess = (message, options = {}) => {
  toast.success(message, buildToastOptions(options));
};

export const notifyError = (message) => {
  toast.error(
    message,
    buildToastOptions({
      autoClose: 3000,
    }),
  );
};

export const notifyInfo = (message) => {
  toast.info(message, buildToastOptions());
};

import { API_BASE_URL, TOKEN_CYBERSOFT } from "@/config/env";
import { SERVICES } from "@/utils/constant";
import { getLocalStorage } from "@/utils/storage";
import axios from "axios";

const ERRORS = {
  /**
   * Server đã trả về một response nhưng với mã trạng thái lỗi
   */
  CODE: {
    // Xử lý lỗi 401 Unauthorized, ví dụ: chuyển hướng đến trang đăng nhập
    401: "Unauthorized access - perhaps the user is not logged in or token expired.",

    // Xử lý lỗi 403 Forbidden
    403: "Forbidden - you don't have permission to access this resource.",

    // Xử lý lỗi 404 Not Found
    404: "Resource not found.",

    // Xử lý lỗi 500 Internal Server Error
    500: "Internal server error.",
  },
  /**
   * Request đã được gửi nhưng không nhận được phản hồi từ server
   */
  SERVER: "No response received from server.",
  /**
   * Một số lỗi khác xảy ra trong quá trình thiết lập request
   */
  REQUEST: "Error setting up request:",
};

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5 * 1000,
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = getLocalStorage(SERVICES.ACCESS_TOKEN);

    if (config.headers) {
      config.headers = {
        ...config.headers,
        TokenCybersoft: TOKEN_CYBERSOFT,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error) => {
    if (error.response) {
      let { status, statusText } = error.response;
      let messError = ERRORS.CODE[status];
      console.error(messError || `Error ${status}: ${statusText}`);
    } else {
      console.error(
        error.request ? ERRORS.SERVER : `${ERRORS.REQUEST}: ${error.message}`,
      );
    }

    return Promise.reject(error);
  },
);

export { httpClient };

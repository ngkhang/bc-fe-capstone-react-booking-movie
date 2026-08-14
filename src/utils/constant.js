export const SERVICES = {
  ACCESS_TOKEN: "accessToken",
};

export const USER_ROLE = {
  CUSTOMER: "KhachHang",
  ADMIN: "QuanTri",
};

export const STORAGE_KEY_USER = "USER_INFO";

export const infoSeat = [
  {
    id: 1,
    type: "empty",
    content: "Ghế VIP",
    className: "seat-empty",
  },
  {
    id: 2,
    type: "block",
    content: "Đã đặt",
    className: "seat-block",
  },
  {
    id: 3,
    type: "booking",
    content: "Ghế đang chọn",
    className: "seat-booking",
  },
];

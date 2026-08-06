import { GROUP_CODE } from "@/config/env";

const QuanLyPhim = "QuanLyPhim";
const QuanLyDatVe = "QuanLyDatVe";
const QuanLyNguoiDung = "QuanLyNguoiDung";
const QuanLyRap = "QuanLyRap";

export const API = {
  [QuanLyDatVe]: {},
  [QuanLyNguoiDung]: {},
  [QuanLyPhim]: {
    LayDanhSachBanner: `/${QuanLyPhim}/LayDanhSachBanner`,
    LayDanhSachPhim: `/${QuanLyPhim}/LayDanhSachPhim?maNhom=${GROUP_CODE}`,
    LayDanhSachPhimPhanTrang: (soTrang = 1, soPhanTuTrenTrang = 10) =>
      `/${QuanLyPhim}/LayDanhSachPhimPhanTrang?maNhom=${GROUP_CODE}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
    LayThongTinPhim: (MaPhim) =>
      `/${QuanLyPhim}/LayThongTinPhim?MaPhim=${MaPhim}`,
  },
  [QuanLyRap]: {},
};

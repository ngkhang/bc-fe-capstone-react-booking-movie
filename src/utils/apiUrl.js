import { GROUP_CODE } from "@/config/env";

const QuanLyPhim = "QuanLyPhim";
const QuanLyDatVe = "QuanLyDatVe";
const QuanLyNguoiDung = "QuanLyNguoiDung";
const QuanLyRap = "QuanLyRap";

export const API = {
  [QuanLyDatVe]: {
    LayDanhSachPhongVe: (maLichChieu) => `/${QuanLyDatVe}/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
  },
  [QuanLyNguoiDung]: {
    DangNhap: `/${QuanLyNguoiDung}/DangNhap`,
    DangKy: `/${QuanLyNguoiDung}/DangKy`,
    ThongTinTaiKhoan: `/${QuanLyNguoiDung}/ThongTinTaiKhoan`,
    LayDanhSachNguoiDung: `/${QuanLyNguoiDung}/LayDanhSachNguoiDung?maNhom=${GROUP_CODE}`,
    ThemNguoiDung: `/${QuanLyNguoiDung}/ThemNguoiDung`,
    CapNhatThongTinNguoiDung: `/${QuanLyNguoiDung}/CapNhatThongTinNguoiDung`,
    XoaNguoiDung: (taiKhoan) =>
      `/${QuanLyNguoiDung}/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    LayDanhSachLoaiNguoiDung: `/${QuanLyNguoiDung}/LayDanhSachLoaiNguoiDung`,
    LayDanhSachNguoiDungPhanTrang: (soTrang, soPhanTuTrenTrang) =>
      `/${QuanLyNguoiDung}/LayDanhSachNguoiDungPhanTrang?maNhom=${GROUP_CODE}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
  },
  [QuanLyPhim]: {
    LayDanhSachBanner: `/${QuanLyPhim}/LayDanhSachBanner`,
    LayDanhSachPhim: `/${QuanLyPhim}/LayDanhSachPhim?maNhom=${GROUP_CODE}`,
    LayDanhSachPhimPhanTrang: (soTrang = 1, soPhanTuTrenTrang = 10) =>
      `/${QuanLyPhim}/LayDanhSachPhimPhanTrang?maNhom=${GROUP_CODE}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
    LayThongTinPhim: (MaPhim) =>
      `/${QuanLyPhim}/LayThongTinPhim?MaPhim=${MaPhim}`,
  },
  [QuanLyRap]: {
    LayThongTinHeThongRap: `/${QuanLyRap}/LayThongTinHeThongRap`,
    LayThongTinLichChieuHeThongRap: (maHeThongRap) =>
      `/${QuanLyRap}/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${GROUP_CODE}`,
    LayThongTinLichChieuPhim: (MaPhim) =>
      `/${QuanLyRap}/LayThongTinLichChieuPhim?MaPhim=${MaPhim}`,
  },
};

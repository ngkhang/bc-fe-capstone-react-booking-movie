import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { useEffect, useState } from "react";

const StatCard = ({ label, value, isLoading }) => (
  <div className="rounded-md border border-gray-100 bg-white p-5 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-2 text-3xl font-bold text-gray-900">
      {isLoading ? "…" : value}
    </p>
  </div>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    users: null,
    movies: null,
    theaterSystems: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      const [usersRes, moviesRes, theatersRes] = await Promise.allSettled([
        httpClient.get(API.QuanLyNguoiDung.LayDanhSachNguoiDung),
        httpClient.get(API.QuanLyPhim.LayDanhSachPhim),
        httpClient.get(API.QuanLyRap.LayThongTinHeThongRap),
      ]);

      console.log(usersRes);

      setCounts({
        users:
          usersRes.status === "fulfilled"
            ? (usersRes.value?.length ?? 0)
            : null,
        movies:
          moviesRes.status === "fulfilled"
            ? (moviesRes.value?.length ?? 0)
            : null,
        theaterSystems:
          theatersRes.status === "fulfilled"
            ? (theatersRes.value?.length ?? 0)
            : null,
      });
      setIsLoading(false);
    };

    loadStats();
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="mt-1 text-sm text-gray-500">
          Số liệu về tài khoản, phim và rạp chiếu.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Tài khoản"
          value={counts.users ?? "-"}
          isLoading={isLoading}
        />
        <StatCard
          label="Phim"
          value={counts.movies ?? "-"}
          isLoading={isLoading}
        />
        <StatCard
          label="Hệ thống rạp"
          value={counts.theaterSystems ?? "-"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

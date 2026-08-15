import MovieList from "@/components/MovieList";
import Theater from "@/components/Theater";
import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { useEffect, useState } from "react";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const res = await httpClient.get(API.QuanLyPhim.LayDanhSachPhim);
        setMovies(res ?? []);
      } catch (error) {
        console.error("Failed to load movie list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (isLoading)
    return <p className="py-10 text-center">Đang tải danh sách phim...</p>;

  const nowShowing = movies.filter((m) => m.dangChieu);
  const comingSoon = movies.filter((m) => m.sapChieu && !m.dangChieu);

  return (
    <div className="flex flex-col gap-y-10">
      <MovieList
        title="Phim đang chiếu"
        movies={nowShowing}
        emptyMessage="Hiện chưa có phim đang chiếu."
      />

      <MovieList
        title="Phim sắp chiếu"
        movies={comingSoon}
        emptyMessage="Hiện chưa có phim sắp chiếu."
        isComingSoon
      />

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Lịch chiếu theo rạp
        </h2>
        <Theater />
      </section>
    </div>
  );
};

export default MovieListPage;

import BannerMovie from "@/components/Banner";
import MovieList from "@/components/MovieList";
import Theater from "@/components/Theater";

const HomePage = () => {
  return (
    <>
      {/* Carousel Banner */}
      <div className="h-56 sm:h-64 lg:h-100 mb-5 lg:mb-10">
        <BannerMovie />
      </div>

      {/* List Movie */}
      <div className="mb-5 lg:mb-10">
        <MovieList />
      </div>

      {/* List Theater */}
      <div className="mb-5 lg:mb-10">
        <Theater />
      </div>
    </>
  );
};

export default HomePage;

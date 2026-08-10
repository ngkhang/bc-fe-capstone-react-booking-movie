import { httpClient } from "@/services/httpClient";
import { API } from "@/utils/apiUrl";
import { Carousel } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";

// FIXME: Banner is not change image

const BannerMovie = () => {
  const [bannerMovies, setBannerMovies] = useState([]);

  useEffect(() => {
    const getListBanner = async () => {
      const res = await httpClient.get(API.QuanLyPhim.LayDanhSachBanner);
      setBannerMovies(res);
    };

    getListBanner();
  }, []);

  return (
    <Carousel slideInterval={5000}>
      {bannerMovies.map(({ maPhim, hinhAnh, maBanner }) => {
        return (
          <img
            key={maPhim}
            src={hinhAnh}
            alt={maBanner}
            className="h-full w-full object-cover"
          />
        );
      })}
    </Carousel>
  );
};

export default BannerMovie;

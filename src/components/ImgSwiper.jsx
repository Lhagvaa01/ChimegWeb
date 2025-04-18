import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetApi } from "../constant/Api";
import { APIURL } from "../context/SampleContext";

const ImgSwiper = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 1500,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    GetApi(`brands/`).then((val) => {
      setBrands(val);
    });
  }, []);

  return (
    <div className="mx-5 md:mx-10 lg:mx-20 mb-5">
      <div className="flex md:flex mt-10 justify-center pb-3 text-xl md:text-3xl">
        Брэндүүд
      </div>

      <div className="flex pb-3 justify-center">
        <div className="w-1/6 border-b border-green-800"></div>
      </div>
      <Slider {...settings} className="shadow-2xl">
        {brands.map((item, index) => (
          <div key={index} className="my-5 px-3">
            <img
              className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain"
              src={`${item.image}`}
              alt={`Brand ${item.name}`}
              // alt={`${"https://" + APIURL + item.image}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImgSwiper;

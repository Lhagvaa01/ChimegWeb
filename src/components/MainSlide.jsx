import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import jsData from "../data/product.json";
import Cover from "../images/kacc.jpg";
import axios from "axios";
import { APIURL } from "../context/SampleContext";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const ImgSwiper = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2500,
    arrows: false,
  };
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];

  useEffect(() => {
    getSliders();
  }, []);

  const [dtlSlide, setdtlSlide] = useState([]);
  const getSliders = () => {
    const token = "token 218d68b6dfe280a288a396352f7d720a18a00997";
    const axiosInstance = axios.create({
      headers: {
        Authorization: `${token}`,
      },
    });

    axiosInstance
      .get(`https://${APIURL}/get_SiteSliderImg/`)
      .then((response) => {
        setdtlSlide(response.data.dtl);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // console.log(dtlSlide);
  }, [dtlSlide]);

  return (
    <Slider {...settings} className="block w-full md:pt-40 pt-20">
      {dtlSlide.map((slide) => (
        // <div className="relative max-h-[640px] w-full md:h-[450px] h-[150px]">
        //   {/* <img
        //     className="relative max-h-[640px] w-full md:h-[450px] h-[300px]"
        //     src={slide.url}
        //   /> */}
        //   <div
        //     style={{ backgroundImage: `url(${slide.TCFileUrl})` }}
        //     className="w-full h-full bg-center bg-contain duration-500"
        //     // className="w-full h-full bg-center bg-cover duration-500"
        //   ></div>
        // </div>
        <div className=" w-full h-full">
          <img
            alt=""
            loading="lazy"
            className="h-full max-h-[640px] w-full md:h-[550px]"
            decoding="async"
            data-nimg="1"
            src={slide.TCFileUrl}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImgSwiper;

import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeContainer from "./HomeContainer";
import ProductContainer from "./ProductContainer";
import ImgSwiper from "../components/ImgSwiper";
import MainSlide from "../components/MainSlide";
import Ad from "../components/Ad";
import { PostApi, GetApi } from "../constant/Api";
import jsData from "../data/product.json";
import { Url } from "../context/SampleContext";

const MainContainer = ({ addProductToCart, dBproduct, dBgroup }) => {
  // const getQuote = () => {
  //   const token = "token b84cf4f51d8a5ad606ece08a8b2d72bdb8f3c1db";
  //   const axiosInstance = axios.create({
  //     headers: {
  //       Authorization: `${token}`,
  //     },
  //   });

  //   axiosInstance
  //     .get(`${Url}/get_GroupHDR/`)
  //     .then((response) => {
  //       try {
  //         // setGlobalGroup(response.data.dtl);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //       console.log("gGroup: ");
  //       // console.log(globalGroup);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
  const [adData, setAdData] = useState(null);

  // Рекламын өгөгдөл
  const ad_data = {
    version: "1.0.4",
    title: "Хямдралтай бараа",
    description:
      "MetroPos i5 Shop Загварын касс 20% Хямдраад 1,200,000₮ -өөс 1,000,000₮ болж хямдарлаа!!!",
    image: "http://old.kacc.mn/static/uploads/product/.jpg",
    link: "http://localhost:8088/product-detail/5036",
  };

  useEffect(() => {
    try {
      GetApi(`getAd/`)
        .then((val) => {
          if (val.error !== "No advertisement available") {
            setAdData(val);
          }
        })
        .catch((error) => {
          errorToast(error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  return (
    <div className="">
      <div>{adData && <Ad adData={adData} />}</div>
      <MainSlide />
      <HomeContainer dBgroup={dBgroup} />
      <div className="md:pt-10 md:mx-32">
        <ProductContainer
          addProductToCart={addProductToCart}
          dBproduct={dBproduct}
          dBgroup={dBgroup}
          isMain={true}
        />
      </div>

      <ImgSwiper />
    </div>
  );
};

export default MainContainer;

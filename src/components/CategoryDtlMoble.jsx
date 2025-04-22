import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../images/Logo.png";
import { Url, token } from "../context/SampleContext";

const CategoryDtlMobile = ({ dBgroup }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    const axiosInstance = axios.create({
      headers: { Authorization: `${token}` },
    });

    try {
      const response = await axiosInstance.get(
        "https://api.chimeg.mn/get_GroupHDR/"
      );
      setPosts(response.data.dtl);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally set an error state to display to the user
    }
  };

  return (
    <div className="h-full space-y-20">
      <div className=" mt-3 ml-9 mr-6 grid">
        {dBgroup.map((category) => (
          <div key={category.catId}>
            <a
              href={`/ProductCat/${category.catId}/0`}
              className="flex justify-between"
            >
              <div className="text-base font-semibold mb-1 text-slate-700">
                {category.catName}
              </div>
              <IoIosArrowForward />
            </a>
            {/* Uncomment this if you want to render subcategories */}
            {/* <ul>
              {Object.values(category.catDtl[0]).map((detail, index) => (
                <li className="flex" key={index}>
                  <PiDotOutlineFill className="mr-1 mt-1" />
                  <a href={`/ProductCat/${category.catId}/${index + 1}`} className="hover:text-green-800">
                    {detail}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>

      <div className="border-t">
        <div className="mt-3 ml-9 mr-6 grid gap-2">
          <div className="flex justify-between items-center">
            <a href="/About">Бидний тухай</a>
          </div>
          <div className="flex justify-between items-center">
            <a href="/ProgrammInfo">Программ</a>
          </div>
          <div className="flex justify-between items-center">
            <a href="/Contact">Холбоо барих</a>
          </div>
          <div className="flex justify-between items-center">
            <a href="/Download">Татах</a>
          </div>
          {/* <div className="flex justify-between items-center">
            <a href="http://old.kacc.mn">Хуучин Сайт</a>
          </div> */}
        </div>

        <footer className="flex mx-4 mt-5 items-center border-t border-green-800 justify-center pt-3">
          <img src={Logo} className="w-20" alt="logo" />
          <div className="mt-3 ml-2">
            <p className="mb-4 text-center font-normal text-sm text-blue-gray-900 md:mb-0">
              POWERED BY CHIMEG.MN
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CategoryDtlMobile;

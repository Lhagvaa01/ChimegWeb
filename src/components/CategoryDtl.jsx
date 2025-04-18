import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PiDotOutlineFill } from "react-icons/pi";
import gGroups from "../data/category.json";

import { Url, token } from "../context/SampleContext";

const CategoryDtl = ({ dBgroup }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getQuote();
  }, []); // Empty dependency array since getQuote doesn't depend on any prop or state

  const getQuote = () => {
    // const token = "token b84cf4f51d8a5ad606ece08a8b2d72bdb8f3c1db";
    const axiosInstance = axios.create({
      headers: {
        Authorization: `${token}`,
      },
    });

    axiosInstance
      .get("http://202.131.237.185:3030/get_GroupHDR/")
      .then((response) => {
        setPosts(response.data.dtl);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // console.log(posts);
  }, [posts]); // Logging posts in a separate useEffect with posts as dependency

  return (
    <div className="absolute mx-[170px] h-[550px] bg-slate-100 right-0 left-0 rounded-b-2xl">
      <div className="grid grid-cols-5 gap-3 py-2 text-sm text-gray-600 p-5">
        {/* Iterate over the categories */}
        {dBgroup.map((category) => (
          <div key={category.catId}>
            {/* Render the category name */}
            <div className="text-base font-bold mb-3">{category.catName}</div>
            <ul>
              {/* Iterate over the details of the current category */}
              {Object.entries(category.catDtl[0]).map(([key, value], index) => (
                <li className="flex" key={index}>
                  {/* Render the dot icon */}
                  <PiDotOutlineFill className="mr-1 mt-1" />
                  {/* Render the detail as a link */}
                  <a
                    href={`/ProductCat/${category.catId}/${key}`}
                    className="hover:text-green-800"
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDtl;

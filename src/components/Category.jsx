import React, { useEffect, useRef, useState } from "react";
import jsData from "../data/category.json";

const Category = ({ dBgroup }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter the data when the component mounts
    const filtered = dBgroup.filter((item) => item.isFeatured === true);
    setFilteredData(filtered);
  }, [dBgroup]); // Update the filtered data whenever dBgroup changes

  return (
    <div className="md:mt-12 md:mx-36">
      <div className="">
        <div className="hidden md:flex justify-center pb-3 text-3xl">
          Онцлох ангилал
        </div>
        <div className="flex pb-5 justify-center">
          <div className="w-1/6 border-b border-green-800"></div>
        </div>
        <div className="hidden md:flex justify-between ">
          {filteredData.map((item) => (
            <a
              href={`/ProductCat/${item.catId}/0`}
              className="grid"
              key={item.catId}
            >
              <div className="flex w-[150px] h-[150px] border-2 border-green-800 rounded-2xl items-center justify-center">
                <img
                  alt="IMG"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="w-[120px] h-[120px]"
                  src={
                    item.catImg && item.catImg.length > 0
                      ? item.catImg
                      : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                  }
                />
              </div>
              <div className="flex justify-center pt-2">{item.catName}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;

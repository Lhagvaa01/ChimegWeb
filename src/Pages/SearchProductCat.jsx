import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import ProductContainer from "./ProductContainer";

const SearchProductCat = ({ addProductToCart, dBproduct, dBgroup, isMain }) => {
  const [catId, setCatId] = useState("");
  const [catDtlId, setCatDtlId] = useState("");
  const [isOpenLan, setIsOpenLan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showMenuGroup, setShowMenuGroup] = useState([]);
  const [counter, setCounter] = useState(0);

  const location = useLocation();

  useEffect(() => {
    setShowMenuGroup(dBgroup);
    const query = new URLSearchParams(location.search);
    setSearchQuery(query.get("query") || "");
    const filtered = dBproduct.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [location, searchQuery, dBproduct]);

  useEffect(() => {
    scrollUp();
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0 });
  };

  const handleButtonClick = (catId) => {
    let updatedDBGroup = dBgroup.map((item) => ({
      ...item,
      isShowMenu: item.catId === catId ? !item.isShowMenu : false,
    }));
    setCounter(counter !== catId ? catId : 0);
    setShowMenuGroup(updatedDBGroup);
  };

  const Loader = () => (
    <div className="flex">
      <div className="h-3 w-3 bg-current rounded-full animate-bounce mr-1"></div>
      <div className="h-3 w-3 bg-current rounded-full animate-bounce200 mr-1"></div>
      <div className="h-3 w-3 bg-current rounded-full animate-bounce400"></div>
    </div>
  );

  return (
    <div className="container mx-auto my-10 px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Categories */}
        <div className="md:col-span-1 bg-white shadow-sm rounded-lg p-5">
          <div className="text-lg font-bold mb-3 border-b pb-1 text-gray-500">
            Categories
          </div>
          <div>
            {showMenuGroup.map((category) => (
              <div key={category.catId} className="mb-2">
                <div
                  className={`text-base text-gray-500 pt-3 ${
                    catId === category.catId
                      ? "font-semibold text-green-800"
                      : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <button
                      className="focus:outline-none"
                      onClick={() => handleButtonClick(category.catId)}
                    >
                      {category.catName}
                    </button>
                    <button
                      className="focus:outline-none"
                      onClick={() => handleButtonClick(category.catId)}
                    >
                      {category.isShowMenu ? (
                        <AiOutlineUp size={20} className="fill-green-800" />
                      ) : (
                        <AiOutlineDown size={20} className="fill-green-800" />
                      )}
                    </button>
                  </div>
                </div>
                {category.isShowMenu && (
                  <ul className="pl-4">
                    {Object.entries(category.catDtl[0]).map(
                      ([key, value], index) => (
                        <li key={index} className="flex text-gray-500 my-2">
                          <a
                            href={`/ProductCat/${category.catId}/${key}`}
                            className={`pl-5 ${
                              catDtlId == key && catId == category.catId
                                ? "font-semibold text-green-800"
                                : "hover:text-green-800"
                            }`}
                          >
                            {value}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Container */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center text-sm text-gray-500">
              <div className="font-semibold text-lg mr-2">
                {dBgroup.map((category) =>
                  catDtlId !== 0
                    ? Object.values(category.catDtl[0]).map((detail, index) =>
                        catDtlId == index + 1 && catId == category.catId
                          ? detail
                          : ""
                      )
                    : category.catId === catId
                    ? category.catName
                    : ""
                )}
              </div>
              <div className="flex items-center ml-3">
                <span className="text-xs">{filteredData.length}</span>
                <span className="text-xs ml-1">products</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpenLan(!isOpenLan)}
              className="flex items-center justify-between border px-3 py-2 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <span className="text-xs mr-2">Sort by</span>
              {isOpenLan ? (
                <AiOutlineUp size={14} className="fill-green-800" />
              ) : (
                <AiOutlineDown size={14} className="fill-green-800" />
              )}
            </button>
          </div>

          <div className="border-b-2 mb-5"></div>

          {/* Product Listing */}
          <div className="my-5">
            {isLoading ? (
              <div className="flex h-screen items-center justify-center text-green-800">
                <Loader />
              </div>
            ) : filteredData.length > 0 ? (
              <ProductContainer
                addProductToCart={addProductToCart}
                dBproduct={filteredData}
                isMain={false}
              />
            ) : (
              <div className="flex h-screen items-center justify-center text-green-800">
                <div className="border-green-800 h-36 w-80 items-center justify-center text-2xl">
                  <div>No products found...</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProductCat;

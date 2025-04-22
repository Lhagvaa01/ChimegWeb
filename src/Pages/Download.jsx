import React, { useState, useEffect } from "react";
import { BsArrowRightSquareFill, BsList } from "react-icons/bs";
import { AiOutlineUnorderedList, AiOutlineDownload } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import axios from "axios";
import { APIURL } from "../context/SampleContext";

const Download = ({ dBproduct, dBgroup }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dtlDrivers, setDtlDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilter = (id) => {
    setIsLoading(true);
    setCurrentPage(1);
    setFilteredProducts(dBproduct.filter((product) => product.catId[0] === id));
    setIsLoading(false);
    scrollUp(500);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setIsLoading(true);
    setCurrentPage((prevPage) => prevPage - 1);
    setIsLoading(false);
  };

  const handleNextPage = () => {
    setIsLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  const dtlView = (id) => {
    setIsLoading(true);
    const item = paginatedData.find((p) => p.itemCode === id);
    setDtlDrivers(item.tabInfo[2].content);
    setIsLoading(false);
    scrollUp(1000);
  };

  const getDownload = (pk) => {
    axios
      .get(`http://${APIURL}/get_ProductDownloads/${pk}/`, {
        headers: {
          Authorization: "token b84cf4f51d8a5ad606ece08a8b2d72bdb8f3c1db",
        },
      })
      .then((response) => setDtlDrivers(response.data.drivers))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleClick = (url) => (window.location.href = url);

  const scrollUp = (val) => {
    window.scrollTo({
      top: val,
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-full p-4">
      <div className="w-full h-full md:pt-16 md:px-28">
        {/* Image Section */}
        <div className="relative w-full h-[250px] md:h-[450px] mb-6">
          <div
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80)`,
            }}
            className="w-full h-full bg-center bg-cover rounded-lg"
          ></div>
        </div>

        {/* Title */}
        <div className="md:mx-44 mx-6 text-xl md:text-3xl mb-4 md:mb-10 text-green-800">
          Татах
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch">
          {/* Category Section */}
          <div className="md:w-1/4 w-full mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <BsList className="fill-green-800 mr-2" size={24} />
              <span className="text-lg">Ангилал</span>
            </div>

            {isLoading ? (
              <div>Loading...</div>
            ) : (
              dBgroup.map((cat) => (
                <div key={cat.catId} className="border-b mt-2">
                  <button
                    onClick={() => handleFilter(cat.catId)}
                    className="text-sm md:text-base hover:underline"
                  >
                    {cat.catName}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Product List Section */}
          <div className="md:w-3/4 w-full md:ml-8">
            <div className="flex items-center mb-4">
              <AiOutlineUnorderedList
                className="fill-green-800 mr-2"
                size={24}
              />
              <span className="text-lg">Барааны жагсаалт</span>
            </div>

            {isLoading ? (
              <div>Loading...</div>
            ) : paginatedData.length ? (
              <div className="grid gap-4">
                {paginatedData.map((product) => (
                  <div
                    key={product.itemCode}
                    className="flex justify-between items-center rounded-lg bg-white shadow-md p-4 border"
                  >
                    <div className="flex items-center">
                      <img
                        alt={product.name}
                        className="w-16 h-16 rounded-full object-cover border mr-4"
                        src={product.imgs[0]}
                      />
                      <div className="text-sm md:text-base">{product.name}</div>
                    </div>
                    <button onClick={() => dtlView(product.itemCode)}>
                      <BsArrowRightSquareFill
                        className="fill-green-800"
                        size={24}
                      />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>No products found.</div>
            )}

            {paginatedData.length > 0 && (
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  className="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Өмнөх
                </button>
                <button
                  className="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Дараах
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col-2 mt-10 mb-10 ">
          <div className="col-span-1 md:w-1/4 md:ml-6"></div>
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <AiOutlineDownload className="fill-green-800 mr-2" size={24} />
              <span className="text-lg">Холбоосууд</span>
            </div>

            {isLoading ? (
              <div>Түр хүлээнэ үү...</div>
            ) : dtlDrivers.length ? (
              dtlDrivers.map((dtl) => (
                <div
                  key={dtl.pk}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{dtl.TCFileName}</span>
                  <button
                    className="flex items-center bg-green-800 text-white rounded-md px-4 py-1 hover:bg-green-700"
                    onClick={() => handleClick(dtl.TCFileUrl)}
                  >
                    <HiDownload className="mr-2" />
                    Татах
                  </button>
                </div>
              ))
            ) : (
              <div>Файл олдсонгүй.</div>
            )}
          </div>
        </div>

        {/* Download Links Section */}
        {/* <div className="mt-10">
          <div className="flex items-center mb-4">
            <AiOutlineDownload className="fill-green-800 mr-2" size={24} />
            <span className="text-lg">Холбоосууд</span>
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : dtlDrivers.length ? (
            dtlDrivers.map((dtl) => (
              <div
                key={dtl.pk}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{dtl.TCFileName}</span>
                <button
                  className="flex items-center bg-green-800 text-white rounded-md px-4 py-1 hover:bg-green-700"
                  onClick={() => handleClick(dtl.TCFileUrl)}
                >
                  <HiDownload className="mr-2" />
                  Татах
                </button>
              </div>
            ))
          ) : (
            <div>No downloads available.</div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Download;

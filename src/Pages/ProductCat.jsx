import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import ProductContainer from "./ProductContainer";
import { Button, Drawer } from "antd";

const ProductCat = ({
  addProductToCart,
  dBproduct = [],
  dBgroup = [],
  isMain,
  dBDiscount = [],
}) => {
  const location = useLocation();
  const [catId, setCatId] = useState("");
  const [catDtlId, setCatDtlId] = useState("");
  const [isOpenLan, setIsOpenLan] = useState(false);
  const [product, setProduct] = useState([]);
  const [productCopy, setProductCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenuGroup, setShowMenuGroup] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHardwareCategory, setSelectedHardwareCategory] = useState([]);
  const [selectedHardwareDetail, setSelectedHardwareDetail] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOrder, setSortOrder] = useState("price_increase");
  const [isWindowVisible, setIsWindowVisible] = useState(false);
  const [isAbove1440, setIsAbove1440] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const urlSegments = window.location.pathname.split("/");
    const newCatId = urlSegments[2];
    const newCatDtlId = urlSegments[3];

    setCatId(newCatId);
    setCatDtlId(newCatDtlId);
    setShowMenuGroup(dBgroup);

    const query = new URLSearchParams(location.search);
    const queryParam = query.get("query") || "";
    setSearchQuery(queryParam);

    setIsLoading(true);
    // console.log("isLoading : " + isLoading);

    fetchProduct(
      newCatId,
      newCatDtlId,
      selectedHardwareCategory,
      selectedHardwareDetail,
      minPrice,
      maxPrice,
      selectedBrand,
      sortOrder,
      queryParam
    );
  }, [
    location,
    dBproduct,
    dBgroup,
    selectedHardwareCategory,
    selectedHardwareDetail,
    minPrice,
    maxPrice,
    selectedBrand,
    sortOrder,
    searchQuery,
  ]);

  const fetchProduct = useCallback(
    (
      catHdrCode,
      catDtlCode,
      hardwareCategory,
      hardwareDetail,
      minPrice,
      maxPrice,
      brand,
      order,
      search
    ) => {
      let filteredProducts = [];

      if (searchQuery) {
        filteredProducts = dBproduct.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        if (catHdrCode === "disc") {
          filteredProducts = dBDiscount;
        } else if (catDtlCode !== "0") {
          filteredProducts = dBproduct.filter(
            (item) =>
              parseInt(item.catId[0]) === parseInt(catHdrCode) &&
              [parseInt(item.catId[1][0]), parseInt(item.catId[1][1])].includes(
                parseInt(catDtlCode)
              )
          );
        } else {
          filteredProducts = dBproduct.filter(
            (item) => parseInt(item.catId[0]) === parseInt(catHdrCode)
          );
        }
      }

      if (search) {
        filteredProducts = dBproduct.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (hardwareCategory.length > 0) {
        filteredProducts = filteredProducts.filter((item) =>
          item.hardware_specifications.some((spec) =>
            hardwareCategory.includes(spec.category.name)
          )
        );
      }

      if (hardwareDetail.length > 0) {
        filteredProducts = filteredProducts.filter((item) =>
          item.hardware_specifications.some((spec) =>
            hardwareDetail.includes(`${spec.name} ${spec.detail}`)
          )
        );
      }

      if (brand) {
        filteredProducts = filteredProducts.filter(
          (item) => item.brand?.name === brand
        );
      }

      filteredProducts = filteredProducts.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );

      if (order === "newest") {
        filteredProducts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else if (order === "oldest") {
        filteredProducts.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      } else if (order === "price_increase") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (order === "price_decrease") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      filteredProducts.sort((a, b) => {
        const aStock = a.qty || 0; // Default stock to 0 if not defined
        const bStock = b.qty || 0;
        return bStock - aStock; // Descending order by stock
      });

      setProduct(filteredProducts);
      setProductCopy(filteredProducts);
      // console.log(filteredProducts);
      // setIsLoading(false);
    },
    [dBproduct, dBDiscount]
  );

  useEffect(() => {
    if (product.length > 0) {
      setIsLoading(false);
    }
  }, [product]);

  const brands = [
    ...new Set(
      productCopy.map((item) => item.brand?.name).filter((brand) => brand)
    ),
  ];

  const hardwareCategories = [
    ...new Set(
      productCopy.flatMap((item) =>
        item.hardware_specifications.map((spec) => spec.category.name)
      )
    ),
  ];
  // Compute hardware details for each category
  const hardwareDetails = hardwareCategories.reduce((acc, category) => {
    const details = [
      ...new Set(
        productCopy
          .flatMap((item) => item.hardware_specifications)
          .filter((spec) => spec.category.name === category)
          .map((spec) => `${spec.name} ${spec.detail}`) // Concatenate `name` and `detail`
      ),
    ];
    if (details.length > 0) acc[category] = details;
    return acc;
  }, {});

  const Loader = () => (
    <div className="flex h-screen items-center justify-center text-green-800">
      <div className="flex items-center justify-center">
        <div className="flex border-green-800 h-36 w-80 items-center justify-center text-2xl">
          <div>Түр хүлээнэ үү</div>
          <div className="mt-5 ml-3 animate-spin border-4 border-green-800 border-t-transparent rounded-full h-8 w-8"></div>
        </div>
      </div>
    </div>
  );

  // const [showMenuGroup, setShowMenuGroup] = useState([]);

  const [counter, setCounter] = useState(0);
  const handleButtonClick = (catId) => {
    let updatedDBGroup = dBgroup;

    updatedDBGroup = dBgroup.map((item) => ({
      ...item,
      isShowMenu: false,
    }));
    if (counter !== catId) {
      updatedDBGroup = dBgroup.map((item) => ({
        ...item,
        isShowMenu: item.catId === catId ? true : item.isShowMenu,
      }));
      setCounter(catId);
    } else {
      setCounter(0);
    }
    setShowMenuGroup(updatedDBGroup);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setIsOpenLan(!isOpenLan);
    setOpen(true);
  };

  const onClose = () => {
    setIsOpenLan(!isOpenLan);
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsAbove1440(window.innerWidth >= 1440);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options = [
    { value: "newest", label: "Шинэ нь эхэндээ" },
    { value: "oldest", label: "Хуучин нь эхэндээ" },
    { value: "price_increase", label: "Үнэ өсөхөөр" },
    { value: "price_decrease", label: "Үнэ Буурахаар" },
  ];

  const handleOptionClick = (value) => {
    setSortOrder(value);
    setIsOpenLan(false); // Close dropdown after selection
  };

  return (
    <div className="grid xl:grid-cols-4 grid-cols-3 md:my-40 md:mx-24">
      {/* Sidebar */}
      {isAbove1440 ? (
        <div className="hidden sm:block col-span-1 border mx-5 p-5">
          <h2 className="text-lg font-bold mb-3 border-b pb-1 text-gray-500">
            Ангилал
          </h2>
          <div className="p-2">
            {showMenuGroup.map((category, index) => (
              <div key={`${category.catId}-${index}`}>
                <div
                  className={`text-base text-gray-500 pt-3 font-semibold${
                    catId == category.catId
                      ? "font-semibold text-green-800"
                      : ""
                  }`}
                >
                  {catId == category.catId
                    ? (category.isShowMenu = true)
                    : null}
                  <a
                    href={`/ProductCat/${category.catId}/0`}
                    className="flex justify-between"
                    key={`${category.catId}`}
                  >
                    <div>
                      <button
                        className="focus:outline-none"
                        onClick={() => handleButtonClick(category.catId)}
                      >
                        {category.catName}
                      </button>
                    </div>
                    <button
                      className="focus:outline-none"
                      onClick={() => handleButtonClick(category.catId)}
                    >
                      {category.isShowMenu ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      )}
                    </button>
                  </a>
                </div>
                <ul>
                  {category.isShowMenu
                    ? Object.entries(category.catDtl[0]).map(
                        ([key, value], index) => (
                          <div>
                            <li
                              className="flex text-gray-500"
                              key={`${key}-${category.catId}`}
                            >
                              <div className="pl-5 mr-3">-</div>
                              <a
                                href={`/ProductCat/${category.catId}/${key}`}
                                className={`${
                                  catDtlId == key && catId == category.catId
                                    ? "font-semibold text-green-800"
                                    : "hover:text-green-800"
                                }`}
                              >
                                {value}
                              </a>
                            </li>
                            <div className="mx-5 border-b" />
                          </div>
                        )
                      )
                    : null}
                </ul>
              </div>
            ))}
          </div>

          {/* Hardware Category Filter */}
          <div className="mt-5">
            {/* Hardware Category Tree View */}
            {/* <label className="block text-gray-700 font-semibold mb-2">
            Hardware Category
          </label> */}

            <div className="space-y-2 border-t ">
              {hardwareCategories.map((category) => (
                <div key={category}>
                  {/* Category title */}
                  <div className="flex items-center">
                    <span className="text-gray-600 font-semibold">
                      {category}
                    </span>
                  </div>

                  {/* Hardware Details for each Category */}
                  <div className="pl-6 mt-2 space-y-1">
                    {hardwareDetails[category]?.map((spec) => (
                      <div key={spec} className="flex items-center">
                        <input
                          type="checkbox"
                          value={spec}
                          checked={selectedHardwareDetail.includes(spec)}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSelectedHardwareDetail((prev) =>
                              prev.includes(value)
                                ? prev.filter((item) => item !== value)
                                : [...prev, value]
                            );
                          }}
                          className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-gray-500 text-sm">{spec}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden" />
      )}

      {/* Main Content */}
      <div className="col-span-3 py-5 mt-20 md:mt-0">
        <div className="grid gap-3 md:gap-0 md:flex justify-between px-5 items-center">
          <div className="flex items-end">
            <div className="flex">
              {dBgroup.map((category) =>
                catDtlId != 0
                  ? Object.values(category.catDtl[0]).map((detail, index) => (
                      <div className="font-semibold">
                        {catDtlId == index + 1 && catId == category.catId
                          ? detail
                          : ""}
                      </div>
                    ))
                  : category.catId == catId
                  ? category.catName
                  : ""
              )}
              <div className="flex text-gray-500 ml-3 text-xs items-center">
                <div className="mr-2">{product && product.length}</div>
                <div>бүтээгдэхүүн</div>
              </div>
            </div>
          </div>

          {/* Sorting and Price Filter */}
          <div className="flex space-x-5 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 font-semibold">Үнэ:</span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-20 border border-gray-300 rounded p-1 text-sm"
                placeholder="Min"
              />
              <span className="text-gray-500 text-sm">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 border border-gray-300 rounded p-1 text-sm"
                placeholder="Max"
              />
            </div>
            {isAbove1440 ? (
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="custom-select text-sm text-gray-700 bg-white outline-none rounded-md appearance-none"
                >
                  <option value="newest">Шинэ нь эхэндээ</option>
                  <option value="oldest">Хуучин нь эхэндээ</option>
                  <option value="price_increase">Үнэ өсөхөөр</option>
                  <option value="price_decrease">Үнэ Буурахаар</option>
                </select>
                <div onClick={() => setIsOpenLan(!isOpenLan)}>
                  {isOpenLan ? (
                    <AiOutlineUp size={14} className="fill-green-800" />
                  ) : (
                    <AiOutlineDown size={14} className="fill-green-800" />
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <>
          {/* <Button type="primary" onClick={showDrawer}>
            Open
          </Button> */}

          {!isAbove1440 ? (
            <div className="flex justify-between px-5 pt-3 gap-3">
              {/* Button */}
              <div className="flex w-2/4  items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm space-x-3">
                <div
                  onClick={showDrawer}
                  className="flex w-full gap-3 justify-between cursor-pointer"
                >
                  <div>Шүүлт</div>
                  <div className="flex items-center justify-center">
                    {isOpenLan ? (
                      <AiOutlineUp size={15} className="fill-green-800" />
                    ) : (
                      <AiOutlineDown size={15} className="fill-green-800" />
                    )}
                  </div>
                </div>
              </div>

              {/* Sorting Options */}
              <div className="flex w-2/4 justify-between items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm relative">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => setIsOpenLan(!isOpenLan)}
                >
                  <div className="text-sm text-gray-700 flex justify-between items-center">
                    <span>
                      {
                        options.find((option) => option.value === sortOrder)
                          ?.label
                      }
                    </span>
                    {isOpenLan ? (
                      <AiOutlineUp size={15} className="fill-green-800" />
                    ) : (
                      <AiOutlineDown size={15} className="fill-green-800" />
                    )}
                  </div>
                </div>
                {/* Dropdown options */}
                {isOpenLan && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                      <div
                        key={option.value}
                        className={`px-3 py-2 text-sm hover:bg-gray-100 ${
                          sortOrder === option.value
                            ? "text-green-800 font-semibold"
                            : ""
                        }`}
                        onClick={() => handleOptionClick(option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <div className="flex w-2/4 justify-between items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm space-x-3">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="custom-select text-sm text-gray-700 bg-white outline-none rounded-md appearance-none"
                >
                  <option value="newest">Шинэ нь эхэндээ</option>
                  <option value="oldest">Хуучин нь эхэндээ</option>
                  <option value="price_increase">Үнэ өсөхөөр</option>
                  <option value="price_decrease">Үнэ Буурахаар</option>
                </select>
                <div
                  onClick={() => setIsOpenLan(!isOpenLan)}
                  className="cursor-pointer"
                >
                  {isOpenLan ? (
                    <AiOutlineUp size={15} className="fill-green-800" />
                  ) : (
                    <AiOutlineDown size={15} className="fill-green-800" />
                  )}
                </div>
              </div> */}
            </div>
          ) : null}
          <Drawer title="Ангилал" onClose={onClose} open={open}>
            <div>
              <div className="p-2">
                {showMenuGroup.map((category) => (
                  <div key={category.catId}>
                    <div
                      className={`text-base text-gray-500 pt-3 font-semibold${
                        catId == category.catId
                          ? "font-semibold text-green-800"
                          : ""
                      }`}
                    >
                      {catId == category.catId
                        ? (category.isShowMenu = true)
                        : null}
                      <a
                        href={`/ProductCat/${category.catId}/0`}
                        className="flex justify-between"
                      >
                        <div>
                          <button
                            className="focus:outline-none"
                            onClick={() => handleButtonClick(category.catId)}
                          >
                            {category.catName}
                          </button>
                        </div>
                        <button
                          className="focus:outline-none"
                          onClick={() => handleButtonClick(category.catId)}
                        >
                          {category.isShowMenu ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 15.75 7.5-7.5 7.5 7.5"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          )}
                        </button>
                      </a>
                    </div>
                    <ul>
                      {category.isShowMenu
                        ? Object.entries(category.catDtl[0]).map(
                            ([key, value], index) => (
                              <div>
                                <li className="flex text-gray-500" key={index}>
                                  <div className="pl-5 mr-3">-</div>
                                  <a
                                    href={`/ProductCat/${category.catId}/${key}`}
                                    className={`${
                                      catDtlId == key && catId == category.catId
                                        ? "font-semibold text-green-800"
                                        : "hover:text-green-800"
                                    }`}
                                  >
                                    {value}
                                  </a>
                                </li>
                                <div className="mx-5 border-b" />
                              </div>
                            )
                          )
                        : null}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Hardware Category Filter */}
              <div className="mt-5">
                {/* Hardware Category Tree View */}
                {/* <label className="block text-gray-700 font-semibold mb-2">
            Hardware Category
          </label> */}

                <div className="space-y-2 border-t ">
                  {hardwareCategories.map((category) => (
                    <div key={category}>
                      {/* Category title */}
                      <div className="flex items-center">
                        <span className="text-gray-600 font-semibold">
                          {category}
                        </span>
                      </div>

                      {/* Hardware Details for each Category */}
                      <div className="pl-6 mt-2 space-y-1">
                        {hardwareDetails[category]?.map((spec) => (
                          <div key={spec} className="flex items-center">
                            <input
                              type="checkbox"
                              value={spec}
                              checked={selectedHardwareDetail.includes(spec)}
                              onChange={(e) => {
                                const value = e.target.value;
                                setSelectedHardwareDetail((prev) =>
                                  prev.includes(value)
                                    ? prev.filter((item) => item !== value)
                                    : [...prev, value]
                                );
                              }}
                              className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-gray-500 text-sm">
                              {spec}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Drawer>
        </>

        {/* Brand Filter */}
        {brands.length > 0 ? (
          <div className="mt-5 px-5">
            <label className="block font-semibold text-lg text-gray-600 mb-2">
              Брендүүд
            </label>
            <div className="flex space-x-4 overflow-auto">
              {brands.map((brand, index) => (
                <button
                  key={`${brand}-${index}`}
                  className={`p-2 border rounded ${
                    selectedBrand === brand
                      ? "border-green-800"
                      : "border-gray-300"
                  } hover:border-green-800`}
                  onClick={() =>
                    setSelectedBrand(brand === selectedBrand ? "" : brand)
                  }
                >
                  <img
                    src={
                      dBproduct.find((item) => item.brand?.name === brand)
                        ?.brand.image || "default-brand.png"
                    }
                    alt={brand}
                    className="w-10 h-10 object-contain mb-1"
                  />
                  {/* <div className="text-xs text-center">{brand}</div> */}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* Product Container */}
        <div className="my-5">
          {isLoading ? (
            <Loader />
          ) : product.length > 0 ? (
            <ProductContainer
              key={`${product.id}-${product.catId}`}
              addProductToCart={addProductToCart}
              dBproduct={product}
              isMain={false}
            />
          ) : (
            <div className="flex h-screen items-center justify-center text-green-800">
              <div className="flex items-center justify-center">
                <div className="flex border-green-800 h-36 w-80 items-center justify-center text-2xl">
                  <div>Уучлаарай бүртгэлтэй бараа байхгүй байна...</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCat;

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { APIURL } from "../context/SampleContext";
import Product from "../components/Product";
import Tab from "../components/Tab";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import NumberFormatExample from "../constant/NumberFormatExample";
import { FaStar } from "react-icons/fa";
import { PutApi } from "../constant/Api";
import { successToast, errorToast } from "../constant/ReacrToast";
import DiscountCountdown from "../components/DiscountCountDown";
import ChristmasButton from "../components/CustomButtonNew";
import tie from "../images/tie.png";

// Import the CSS for image gallery

const ProductDetail = ({ addProductToCart, dBproduct, dBgroup }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [quantity, setQuantity] = useState(1); // Тоог хадгалах state
  const [promotionalProducts, setPromotionalProducts] = useState([]);
  const [specProducts, setSpecProducts] = useState([]);

  const incrementQuantity = () => {
    setQuantity((prev) => {
      // if (prev + 1 > selectedColor.qty) {
      //   errorToast("Үлдэгдэл хүрэхгүй байна");
      //   return prev; // Return the current quantity
      // }
      return prev + 1; // Increment the quantity
    });
  };

  // Function to decrease quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  // let APIURL = "127.0.0.1:8000";
  // let APIURL = "invoice.kacc.mn";
  const fetchProductById = async (productId) => {
    const token = "token 218d68b6dfe280a288a396352f7d720a18a00997";
    const axiosInstance = axios.create({
      headers: {
        Authorization: `${token}`,
      },
    });

    try {
      const response = await axiosInstance.get(
        `https://${APIURL}/get_SiteProductNew/${productId}/`
      );
      // console.log(response.data.dtl);
      return response.data.dtl;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);

      try {
        // Fetch product data using the id from route parameters
        const productData = await fetchProductById(id);
        // console.log(productData);

        // Check if the product data is available and structured correctly
        if (productData.length > 0) {
          const productDetail = productData[0]; // Access the first item in the dtl array
          if (
            Array.isArray(productDetail.imgs) &&
            productDetail.imgs.length > 0
          ) {
            setCurrentImage(productDetail.imgs[0]); // Set the first image
          } else {
            console.warn("No images found for this product.");
          } // Set the first image
          setProduct(productDetail); // Set the entire product detail object
          if (productDetail.promotionalProducts?.length > 0) {
            fetchPromotionalProducts(productDetail.promotionalProducts);
          }
          if (productDetail.spareParts?.length > 0) {
            fetchSpecProducts(productDetail.spareParts);
          }
        } else {
          console.error("Product data is not available");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    scrollUp();
  }, [id]);

  const fetchSpecProducts = async (itemCodes) => {
    const token = "token 218d68b6dfe280a288a396352f7d720a18a00997";
    const axiosInstance = axios.create({
      headers: {
        Authorization: `${token}`,
      },
    });
    try {
      const fetchedProducts = await Promise.all(
        itemCodes.map(async (itemCode) => {
          const response = await axiosInstance.get(
            `https://${APIURL}/get_SiteProductNew/${itemCode}/`
          );
          const product = response.data.dtl[0]; // Assuming the API returns an array with a single product
          return {
            ...product, // Spread the product data
          };
        })
      );
      setSpecProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching promotional products:", error);
    }
  };

  const fetchPromotionalProducts = async (itemCodes) => {
    const token = "token 218d68b6dfe280a288a396352f7d720a18a00997";
    const axiosInstance = axios.create({
      headers: {
        Authorization: `${token}`,
      },
    });
    try {
      const fetchedProducts = await Promise.all(
        itemCodes.map(async (itemCode) => {
          const response = await axiosInstance.get(
            `https://${APIURL}/get_SiteProductNew/${itemCode.TCItemCode}/`
          );
          const product = response.data.dtl[0]; // Assuming the API returns an array with a single product
          return {
            ...product, // Spread the product data
            quantity: itemCode.quantity, // Add the quantity from itemCode
          };
        })
      );
      setPromotionalProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching promotional products:", error);
    }
  };

  // Render promotional products
  const renderSpecProducts = () => {
    if (specProducts.length > 0) {
      return (
        <div className="mb-8 md:mx-28">
          <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-4 text-center">
            Сэлбэг
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {specProducts.map((promo, index) => (
              <div
                key={index}
                className="flex flex-col items-center border rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full h-24 sm:h-32 md:h-40">
                  <img
                    src={promo.imgs?.[0] || "/default-image.jpg"}
                    alt={promo.name}
                    className="object-contain w-full h-full rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="mt-2 text-center">
                  <h4 className="text-sm font-medium text-gray-800 truncate">
                    {promo.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Барааны код: {promo.itemCode}
                  </p>
                  <p className="text-xs text-gray-500">
                    Барааны Үнэ: {promo.price}
                  </p>
                  <p className="text-xs text-gray-500">Үлдэгдэл: {promo.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Render promotional products
  const renderPromotionalProducts = () => {
    if (promotionalProducts.length > 0) {
      return (
        <div className="mb-8 md:mx-28">
          <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-4 text-center">
            Урамшуулалд дагалдах бараанууд (Үнэгүй)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {promotionalProducts.map((promo, index) => (
              <div
                key={index}
                className="flex flex-col items-center border rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow relative"
              >
                {/* Bow Icon */}
                <div className="absolute top-0 left-0 -rotate-45">
                  <img
                    src={tie} // Банткийн зургийн замыг энд оруулна
                    alt="Бэлэгний бантик"
                    className="w-10 h-10" // Зургийн хэмжээг өөрчлөх
                  />
                </div>

                {/* Image */}
                <div className="relative w-full h-24 sm:h-32 md:h-40">
                  <img
                    src={promo.imgs?.[0] || "/default-image.jpg"}
                    alt={promo.name}
                    className="object-contain w-full h-full rounded-md"
                  />
                  <span className="absolute top-2 right-2 bg-green-800 text-white text-xs px-2 py-1 rounded">
                    Үнэгүй
                  </span>
                </div>

                {/* Product Details */}
                <div className="mt-2 text-center">
                  <h4 className="text-sm font-medium text-gray-800 truncate">
                    {promo.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Барааны код: {promo.itemCode}
                  </p>
                  <p className="text-xs text-gray-500">
                    Барааны Үнэ: {promo.price}
                  </p>
                  <p className="text-base font-semibold text-green-500">
                    Тоо/ш: {promo.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
    });
  };
  const defaultTab = product.tabInfo != null ? product.tabInfo[0] : "";

  const Loader = () => {
    let circleCommonClasses = "h-3 w-3 bg-current   rounded-full";

    return (
      <div className="flex">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
        <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
    );
  };

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });
  const [upd, setUpd] = useState(0);

  const saveUserField = (product) => {
    // console.log(userInfo);
    setUpd(0);

    if (userInfo != null && userInfo.TCWhishLists != null) {
      let updatedTCWhishLists;
      let isFav = false;

      // Check if the product is already in the wish list
      const isInWishList = userInfo.TCWhishLists.includes(product.pk);

      // Update TCWhishLists based on whether the product is in the wish list or not
      if (isInWishList) {
        updatedTCWhishLists = userInfo.TCWhishLists.filter(
          (item) => item !== product.pk
        );
      } else {
        updatedTCWhishLists = [...userInfo.TCWhishLists, product.pk];
        isFav = true;
      }

      // Update local storage and state
      secureLocalStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...userInfo,
          TCWhishLists: updatedTCWhishLists,
        })
      );

      setUserInfo((oldState) => ({
        ...oldState,
        TCWhishLists: updatedTCWhishLists,
      }));

      // Update isFav state
      setIsFav(isFav);

      PutApi(
        `put_EditUser/${userInfo.id}/`,
        JSON.stringify({
          ...userInfo,
          TCWhishLists: updatedTCWhishLists,
        })
      ).then((val) => {
        secureLocalStorage.setItem("userInfo", JSON.stringify(val.dtl));
      });
    } else {
      console.log("userInfo is null.");
    }
  };

  // var newUser = {};
  useEffect(() => {
    // console.log(userInfo);
  }, [userInfo]);

  const productMore = (id) => {
    // console.log(dBgroup);
    if (dBgroup) {
      const foundGroup = dBgroup.find((Gitem) => Gitem.catId === parseInt(id));

      // console.log(foundGroup);
      if (foundGroup) {
        return dBproduct.map(
          (item) =>
            item.catId[0] == foundGroup.catId && (
              <Product
                key={item.id}
                addProductToCart={addProductToCart}
                item={item}
              />
            )
        );
      }
    } else if (JSON.parse(secureLocalStorage.getItem("dBgroup"))) {
      const foundGroup = JSON.parse(secureLocalStorage.getItem("dBgroup")).find(
        (Gitem) => Gitem.catId === parseInt(id)
      );

      // console.log(foundGroup);
      if (foundGroup) {
        return dBproduct.map(
          (item) =>
            item.catId[0] == foundGroup.catId && (
              <Product
                key={item.id}
                addProductToCart={addProductToCart}
                item={item}
              />
            )
        );
      }
    } else {
      return null;
    }
  };

  const renderCarousel = (id) => {
    const products = productMore(id)?.filter(Boolean) || [];

    return products.length > 0 ? (
      <Carousel
        showDots
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
      >
        {products}
      </Carousel>
    ) : (
      <div>No products available in this category</div>
    );
  };

  // const renderCarousel = (id) => {
  //   console.log(id);
  //   const dbCatProd = productMore(id);
  //   if (dbCatProd != null) {
  //     const products = productMore(id).filter((item) => item !== false);

  //     console.log(products);
  //     if (products && products.length > 0) {
  //       return (
  //         <Carousel
  //           showDots={true}
  //           responsive={responsive}
  //           infinite={true}
  //           autoPlay={true}
  //           autoPlaySpeed={5000}
  //           className="z-10"
  //         >
  //           {products}
  //         </Carousel>
  //       );
  //     } else {
  //       return <div>Тухайн тасагт бараа бүртгэгдээгүй байна</div>;
  //     }
  //   } else {
  //     return <div>Тухайн тасагт бараа бүртгэгдээгүй байна</div>;
  //   }
  // };
  const handleBackClick = () => {
    window.history.back();
  };

  const [selectedColor, setSelectedColor] = useState(null); // State to track the selected color

  const handleColorSelect = (color) => {
    if (color === selectedColor) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  // const handleAddToCart = () => {
  //   if (selectedColor) {
  //     // addProductToCart({ ...product, color: selectedColor });
  //     addProductToCart({ ...product, color: selectedColor });
  //   } else {
  //     alert("Please select a color before adding to the cart.");
  //   }
  // };

  const handleAddToCart = () => {
    if (product.color_variants?.length == 1) {
      addProductToCart(product, product.color_variants[0], quantity);
    } else {
      if (selectedColor) {
        addProductToCart(product, selectedColor, quantity); // Pass selected color separately if needed
      } else {
        errorToast("Барааны өнгө сонгоно уу!");
      }
    }
  };

  // const [currentImage, setCurrentImage] = useState(product.imgs[0]);

  return (
    <>
      <Helmet>
        <title>
          {product.name
            ? `${product.name} - Чимэг - Алт - Монет`
            : "Чимэг - Алт - Монет"}
        </title>
        <meta
          name="description"
          content={product.description || "Чимэг - Алт - Монет."}
        />
      </Helmet>
      <div className="bg-white md:mt-9  ">
        {isLoading ? (
          <div className="flex h-screen items-center justify-center text-green-800">
            <div className="flex items-center justify-center">
              <div className="flex border-green-800 h-36 w-80 items-center justify-center text-2xl">
                <div>Түр хүлээнэ үү</div>
                <div className="mt-5 ml-3">
                  <Loader />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-lg bg-white">
            <div className="flex flex-col   md:flex-row">
              <div class="p-6 pt-[30px] lg:pt-5 lg:pl-14 md:mt-20 lg:mt-[80px] xl:p-16 pr-0">
                <div className="hidden sm:block md:flex items-center justify-between mb-8 lg:mb-10">
                  <a
                    href="#"
                    onClick={handleBackClick}
                    className="inline-flex items-center justify-center font-semibold text-sky-500 transition-colors hover:text-cyan-600 "
                  >
                    <div className="px-2">
                      <AiOutlineArrowLeft />
                    </div>
                    Back
                  </a>
                </div>
                <div className="block sm:hidden  mb-5 items-start justify-between w-full space-x-8 space-x-reverse">
                  <h1
                    key={product.name}
                    className="text-lg font-semibold tracking-tight  md:text-xl xl:text-2xl"
                  >
                    {product.name}
                  </h1>
                </div>

                <div className="h-full relative">
                  <div className="space-y-4">
                    {/* Main Image Gallery */}
                    <div className="flex items-center justify-center border-2 rounded-lg overflow-hidden md:ml-[65px] md:max-w-lg lg:max-w-xl">
                      {Array.isArray(product.imgs) &&
                      product.imgs.length > 0 ? (
                        <ImageGallery
                          items={product.imgs.map((img, index) => ({
                            original: img, // Replace img with your image URL property if different
                            thumbnail: img,
                            originalAlt: `Image ${index + 1} of ${
                              product.name
                            }`, // Descriptive alt text for original
                            thumbnailAlt: `Thumbnail ${index + 1} of ${
                              product.name
                            }`, // Descriptive alt text for thumbnail
                          }))}
                          showPlayButton={false} // Hide play button for a cleaner UI
                          showFullscreenButton={true} // Option to view in fullscreen
                          showThumbnails={true} // Display thumbnails
                          thumbnailPosition="right" // Position of thumbnails: 'top', 'bottom', 'left', 'right'
                          autoPlay={true} // Enable autoplay
                          slideDuration={1000} // Duration of slide animation in ms
                          slideInterval={3000} // Interval between slides for autoplay
                          // additionalClass="custom-gallery"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                          No images available
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {/* {Array.isArray(product.imgs) && product.imgs.length > 0 && (
                    <div className="flex gap-3 justify-center overflow-x-auto overflow-y-hidden flex-nowrap w-full md:ml-[65px] md:w-[450px] lg:w-[542px]">
                      {product.imgs.map((img, index) => (
                        <img
                          key={index}
                          className="cursor-pointer max-h-20 w-20 border border-gray-200 rounded-lg transition-transform transform hover:scale-105 shadow-sm hover:shadow-md"
                          onClick={() => setCurrentImage(img)}
                          src={img}
                          alt={`Product image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )} */}
                  </div>

                  {/* {product.imgs?.length > 1 && (
                  <div className="flex max-w-full md:ml-[65px] ">
                    {product.imgs?.map(
                      (
                        img,
                        index // Added key prop to map iterator
                      ) => (
                        <img
                          key={index} // Added key prop
                          className="cursor-pointer max-h-24 border-2 hover:scale-110 transition-all mt-2 mr-2"
                          width={80}
                          height={80}
                          onClick={() => setCurrentImage(img)}
                          src={img}
                        />
                      )
                    )}
                  </div>
                )} */}
                  {product.discountPrice !== 0 && (
                    <div className="absolute top-3 text-center bg-green-800 right-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-white sm:px-2 md:top-4 md:px-2.5">
                      {/* <div>Хямдралтай</div> */}
                      <div className="flex font-bold">
                        -
                        {NumberFormatExample(
                          product.price - product.discountPrice
                        )}
                        ₮
                      </div>
                    </div>
                  )}
                  {product.qty === 0 && (
                    <div className="absolute top-3 text-center bg-red-600 right-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-white sm:px-2 md:top-4 md:px-2.5">
                      {/* <div>Хямдралтай</div> */}
                      <div className="flex font-bold">Дууссан</div>
                    </div>
                  )}
                  {product.promotionalProducts?.length > 0 && (
                    <div className="absolute top-3 text-center bg-green-800 left-3 md:left-20 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-white sm:px-2 md:top-4 md:px-2.5">
                      {/* <div>Хямдралтай</div> */}
                      <div className="flex font-bold">Бэлэгтэй</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:mt-10 items-start p-5 md:pt-10 md:w-1/2 lg:p-14 xl:p-16 md:mr-[30px]">
                <div className="w-full">
                  <div className="hidden sm:block md:flex items-start justify-between w-full space-x-8 space-x-reverse mt-16">
                    {product && product.brand ? (
                      <h1 className="flex items-center gap-3 text-lg md:text-xl xl:text-2xl font-semibold tracking-tight text-green-800 hover:text-green-500 transition-colors duration-200">
                        {product.brand.name}:{" "}
                        <h1 className="text-black block text-lg font-medium">
                          {product.name}
                        </h1>
                      </h1>
                    ) : (
                      <h1 className="block text-base font-medium mr-2">
                        {product.name}
                      </h1>
                    )}

                    <div>
                      <button
                        type="button"
                        className=""
                        onClick={() => {
                          saveUserField(product);
                        }}
                      >
                        {isFav ? (
                          <IoMdHeart size={32} color="green" />
                        ) : (
                          <IoIosHeartEmpty size={32} color="green" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 justify-between">
                    <div className="flex">
                      <span className="block text-base font-medium mr-2">
                        Барааны код:
                      </span>
                      <span className="block text-base font-normal mr-5">
                        {product.itemCode}
                      </span>
                    </div>
                    {/* <div>
                    <button
                      type="button"
                      className=""
                      onClick={() => {
                        saveUserField(product);
                      }}
                    >
                      {isFav ? (
                        <IoMdHeart size={32} color="green" />
                      ) : (
                        <IoIosHeartEmpty size={32} color="green" />
                      )}
                    </button>
                  </div> */}
                  </div>
                  <div className="grid items-center mt-2">
                    {product.color_variants?.length != 1 ? (
                      <div className="flex mr-5 items-center">
                        <span className="block text-base font-medium mr-2 text-black">
                          Өнгө:
                        </span>
                        {product.color_variants?.length > 0 && (
                          <div className="flex space-x-2">
                            {product.color_variants.map((color) => (
                              <span
                                key={color.id}
                                style={{ backgroundColor: color.hex_value }}
                                className={`border-2 h-10 w-10 rounded-full cursor-pointer transition-transform transform
                            ${
                              selectedColor?.id === color.id
                                ? "border-green-800 shadow-xl scale-110"
                                : "border-gray-600 drop-shadow-xl"
                            }
                            hover:scale-110`}
                                onClick={() => handleColorSelect(color)}
                                title={color.ColorName}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {/* <div className="mt-0.5 mr-10 h-10 w-10 items-center  rounded-full border border-gray-300"></div> */}
                    <div className="flex items-center mt-5">
                      <span className="block text-base font-medium mr-2 ">
                        {!selectedColor
                          ? "Нийт Үлдэгдэл:"
                          : `${selectedColor.ColorName} - Үлдэгдэл:`}
                      </span>
                      <span className="block text-sm font-normal mr-5">
                        {!selectedColor
                          ? `${
                              product?.catId?.[0] == 5 && product.qty > 200 // Check if catId[0] exists
                                ? "200+"
                                : product.qty > 10
                                ? "10+"
                                : product.qty
                            }ш`
                          : `${
                              product?.catId?.[0] == 5 &&
                              selectedColor.qty > 200 // Check if catId[0] exists
                                ? "200+"
                                : selectedColor.qty > 10
                                ? "10+"
                                : selectedColor.qty
                            }ш`}
                      </span>
                      <div className="flex items-center">
                        {/* Тоо хасах товч */}
                        <button
                          className="px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-100 hover:bg-green-800 hover:text-white transition-colors"
                          onClick={decrementQuantity}
                        >
                          -
                        </button>

                        {/* Тоог гараас оруулах боломжтой input талбар */}
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value > 0) {
                              setQuantity(value);
                            }
                          }}
                          className="w-16 text-center px-2 py-2 border-t border-b border-gray-300 focus:outline-none"
                        />

                        {/* Тоо нэмэх товч */}
                        <button
                          className="px-4 py-2 border border-gray-300 rounded-r-lg bg-gray-100 hover:bg-green-800 hover:text-white transition-colors"
                          onClick={incrementQuantity}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-3 text-sm leading-7  md:mt-4">
                  {product.tabInfo != null ? product.tabInfo[1].content : ""}
                </div> */}
                  <div className="mt-3 text-sm leading-7  md:mt-4">
                    {product.tabInfo && product.tabInfo.length > 1 ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.tabInfo[1].content,
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  {/* <div className="flex items-center mt-5 md:mt-10">
                    <div className="flex text-2xl font-semibold no-underline text-green-800 md:text-3xl">
                      Үнэ:{" "}
                    </div>
                    <span className="flex items-center">
                      {product.discountPrice === 0 ? (
                        <ins className="flex text-2xl font-semibold no-underline text-green-800 md:text-3xl">
                          {NumberFormatExample(product.price)}₮
                        </ins>
                      ) : (
                        <div className="flex items-end">
                          <ins className="flex text-base font-semibold text-end line-through text-gray-500 md:text-2xl">
                            {NumberFormatExample(product.price)}₮
                          </ins>
                          <ins className="flex text-2xl font-semibold no-underline text-green-800 md:text-3xl">
                            /
                          </ins>
                          <ins className="flex text-2xl font-semibold no-underline text-green-800 md:text-3xl">
                            {NumberFormatExample(product.discountPrice)}₮
                          </ins>
                        </div>
                      )}
                    </span>
                    {product.discountPrice !== 0 ? (
                      <div className="flex">
                        <div className="mr-3">Хэмнэлт: </div>
                        <div className="flex text-red-500 font-bold">
                          {NumberFormatExample(
                            product.price - product.discountPrice
                          )}
                          ₮
                        </div>
                      </div>
                    ) : null}
                  </div> */}
                  <div className="pt-5">
                    {/* Discount Countdown */}
                    {product.discountPrice > 0 && product.discountEndDate && (
                      <DiscountCountdown endDate={product.discountEndDate} />
                    )}

                    {/* Pricing Section */}
                    <div className="mt-4">
                      <div className="grid xl:flex items-center xl:items-end xl:space-x-4">
                        {product.discountPrice > 0 ? (
                          <>
                            <div className="text-3xl font-bold text-green-800">
                              Үнэ:{" "}
                              {new Intl.NumberFormat().format(
                                product.discountPrice
                              )}
                              ₮
                            </div>
                            <div className="flex gap-3 pt-2 xl:pt-0">
                              <div className="text-base font-semibold text-gray-500 line-through">
                                Үндсэн үнэ:
                                {new Intl.NumberFormat().format(
                                  product.price
                                )}{" "}
                                ₮
                              </div>
                              <div className="text-sm bg-red-600 text-white px-2 py-1 rounded">
                                -
                                {Math.round(
                                  ((product.price - product.discountPrice) /
                                    product.price) *
                                    100
                                )}
                                %
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-4xl font-bold text-green-800">
                            Үнэ: {new Intl.NumberFormat().format(product.price)}{" "}
                            ₮
                          </div>
                        )}
                      </div>
                      <div>
                        Бэлэн төлөлтөөр авбал 10% хямдралтай авах боломжтой
                      </div>

                      {/* Savings */}
                      {product.discountPrice > 0 && (
                        <div className="mt-2 text-gray-700">
                          Хэмнэлт:{" "}
                          <span className="font-bold text-red-600">
                            {new Intl.NumberFormat().format(
                              product.price - product.discountPrice
                            )}{" "}
                            ₮
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center mt-6 md:mt-6 lg:flex-row">
                    <div className="mb-3 w-full lg:mb-0 lg:max-w-[400px]">
                      <div>
                        <ChristmasButton onClick={handleAddToCart}>
                          <span>Сагсанд нэмэх ({quantity} ш)</span>
                        </ChristmasButton>
                      </div>
                    </div>
                    {/* <span className="text-base whitespace-nowrap  ml-10 ">
                  0 pieces available
                </span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-5">
              {renderPromotionalProducts()}
              <Tab tabs={product} defaultTab={defaultTab} />

              <div className="border-b border-opacity-70 md:mx-32 mb-5"></div>
              {/* Rating */}
              {/* <div className="p-5 md:py-12 lg:px-16 md:ml-32">
              <h2 className="mb-7 text-lg font-semibold tracking-tight ">
                Ratings &amp; Reviews of {product.name}
              </h2>
              <Rate />
              <div>Нийт 0 хүн үнэлгээ өгсөн</div>
              </div> */}
              {/* <div className="flex w-full flex-col divide-y divide-gray-200 divide-opacity-70 sm:flex-row sm:items-center sm:space-x-8 sm:divide-y-0 sm:divide-x ">
                <div className="w-full  pb-4 sm:w-auto sm:pb-0">
                  <span className="inline-flex shrink-0 items-center rounded-full bg-teal-500 text-white px-6 py-2 text-3xl font-semibold mb-4">
                    0
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      viewBox="0 0 25.056 24"
                      className="h-6 w-6 ml-2 mr-2"
                    >
                      <g data-name="Group 36413" fill="currentColor">
                        <path
                          id="Path_22667"
                          data-name="Path 22667"
                          d="M19.474,34.679l-6.946-4.346L5.583,34.679a.734.734,0,0,1-1.1-.8L6.469,25.93.263,20.668a.735.735,0,0,1,.421-1.3l8.1-.566,3.064-7.6a.765.765,0,0,1,1.362,0l3.064,7.6,8.1.566a.735.735,0,0,1,.421,1.3L18.588,25.93l1.987,7.949a.734.734,0,0,1-1.1.8Z"
                          transform="translate(0 -10.792)"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <p className="text-base text-gray-400">
                    <span>0 ratings</span>
                  </p>
                </div>
                <div className="space-y-3 py-0.5 pt-4 pl-5 sm:pt-0 ">
                  <div></div>
                  <div className="flex items-center text-sm ">
                    <div className="flex w-11 shrink-0 items-center space-x-1 font-semibold space-x-reverse">
                      <span className="text-sm font-semibold ">5</span>{" "}
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        viewBox="0 0 25.056 24"
                        className="h-2.5 w-2.5 ml-1.5 mr-1.5"
                      >
                        <g data-name="Group 36413" fill="currentColor">
                          <path
                            id="Path_22667"
                            data-name="Path 22667"
                            d="M19.474,34.679l-6.946-4.346L5.583,34.679a.734.734,0,0,1-1.1-.8L6.469,25.93.263,20.668a.735.735,0,0,1,.421-1.3l8.1-.566,3.064-7.6a.765.765,0,0,1,1.362,0l3.064,7.6,8.1.566a.735.735,0,0,1,.421,1.3L18.588,25.93l1.987,7.949a.734.734,0,0,1-1.1.8Z"
                            transform="translate(0 -10.792)"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="relative h-[5px] w-52 overflow-hidden rounded-md bg-[#F1F1F1]">
                      <div className="absolute h-full rounded-md bg-teal-500"></div>
                    </div>
                    <div className="shrink-0 pl-5 pr-5">0</div>
                  </div>
                  <div className="flex items-center text-sm ">
                    <div className="flex w-11 shrink-0 items-center space-x-1 font-semibold space-x-reverse">
                      <span className="text-sm font-semibold ">4</span>{" "}
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        viewBox="0 0 25.056 24"
                        className="h-2.5 w-2.5 ml-1.5 mr-1.5"
                      >
                        <g data-name="Group 36413" fill="currentColor">
                          <path
                            id="Path_22667"
                            data-name="Path 22667"
                            d="M19.474,34.679l-6.946-4.346L5.583,34.679a.734.734,0,0,1-1.1-.8L6.469,25.93.263,20.668a.735.735,0,0,1,.421-1.3l8.1-.566,3.064-7.6a.765.765,0,0,1,1.362,0l3.064,7.6,8.1.566a.735.735,0,0,1,.421,1.3L18.588,25.93l1.987,7.949a.734.734,0,0,1-1.1.8Z"
                            transform="translate(0 -10.792)"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="relative h-[5px] w-52 overflow-hidden rounded-md bg-[#F1F1F1]">
                      <div className="absolute h-full rounded-md bg-green-800"></div>
                    </div>
                    <div className="shrink-0 pl-5 pr-5">0</div>
                  </div>
                  <div className="flex items-center text-sm ">
                    <div className="flex w-11 shrink-0 items-center space-x-1 font-semibold space-x-reverse">
                      <span className="text-sm font-semibold ">3</span>{" "}
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        viewBox="0 0 25.056 24"
                        className="h-2.5 w-2.5 ml-1.5 mr-1.5"
                      >
                        <g data-name="Group 36413" fill="currentColor">
                          <path
                            id="Path_22667"
                            data-name="Path 22667"
                            d="M19.474,34.679l-6.946-4.346L5.583,34.679a.734.734,0,0,1-1.1-.8L6.469,25.93.263,20.668a.735.735,0,0,1,.421-1.3l8.1-.566,3.064-7.6a.765.765,0,0,1,1.362,0l3.064,7.6,8.1.566a.735.735,0,0,1,.421,1.3L18.588,25.93l1.987,7.949a.734.734,0,0,1-1.1.8Z"
                            transform="translate(0 -10.792)"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="relative h-[5px] w-52 overflow-hidden rounded-md bg-[#F1F1F1]">
                      <div className="absolute h-full rounded-md bg-teal-400"></div>
                    </div>
                    <div className="shrink-0 pl-5 pr-5">0</div>
                  </div>
                  <div className="flex items-center text-sm ">
                    <div className="flex w-11 shrink-0 items-center space-x-1 font-semibold space-x-reverse">
                      <span className="text-sm font-semibold ">2</span>{" "}
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        viewBox="0 0 25.056 24"
                        className="h-2.5 w-2.5 ml-1.5 mr-1.5"
                      >
                        <g data-name="Group 36413" fill="currentColor">
                          <path
                            id="Path_22667"
                            data-name="Path 22667"
                            d="M19.474,34.679l-6.946-4.346L5.583,34.679a.734.734,0,0,1-1.1-.8L6.469,25.93.263,20.668a.735.735,0,0,1,.421-1.3l8.1-.566,3.064-7.6a.765.765,0,0,1,1.362,0l3.064,7.6,8.1.566a.735.735,0,0,1,.421,1.3L18.588,25.93l1.987,7.949a.734.734,0,0,1-1.1.8Z"
                            transform="translate(0 -10.792)"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="relative h-[5px] w-52 overflow-hidden rounded-md bg-[#F1F1F1]">
                      <div className="absolute h-full rounded-md bg-amber-500"></div>
                    </div>
                    <div className="shrink-0 pl-5 pr-5">0</div>
                  </div>
                  <div className="flex items-center text-sm ">
                    <div className="flex w-11 shrink-0 items-center space-x-1 font-semibold space-x-reverse">
                      <span className="text-sm font-semibold ">1</span>{" "}
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        viewBox="0 0 25.056 24"
                        className="h-2.5 w-2.5 ml-1.5 mr-1.5"
                      >
                        <g data-name="Group 36413" fill="currentColor">
                          <path
                            id="Path_22667"
                            data-name="Path 22667"
                            d="M19.474,34.679l-6.946-4.346L5.583,34.679a.734.734,0,0,1-1.1-.8L6.469,25.93.263,20.668a.735.735,0,0,1,.421-1.3l8.1-.566,3.064-7.6a.765.765,0,0,1,1.362,0l3.064,7.6,8.1.566a.735.735,0,0,1,.421,1.3L18.588,25.93l1.987,7.949a.734.734,0,0,1-1.1.8Z"
                            transform="translate(0 -10.792)"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="relative h-[5px] w-52 overflow-hidden rounded-md bg-[#F1F1F1]">
                      <div className="absolute h-full rounded-md bg-rose-500"></div>
                    </div>
                    <div className="shrink-0 pl-5 pr-5">0</div>
                  </div>
                </div>
              </div> */}
            </div>
            {renderSpecProducts()}
            <div className="border-b border-opacity-70 md:mx-32 mb-5"></div>
            <div>
              {product.catId && (
                <div className="md:mx-32 mx-5 md:mb-10 mb-5">
                  <div className="flex justify-between md:pt-20">
                    <div className="flex  justify-left items-end md:pb-3 md:text-3xl text-sm font-semibold text-green-800">
                      ТӨСТЭЙ БАРААНУУД
                    </div>

                    <div className="pt-2.5 pl-5 md:text-lg text-sm  hover:text-green-800">
                      <Link
                        to={{
                          pathname: `/ProductCat/${product.catId[0]}/${0}`,
                          // state: { productData: Gitem },
                        }}
                      >
                        ...Бүгдийг харах
                      </Link>
                    </div>
                  </div>
                  <div className="flex pb-8  justify-left">
                    <div className="w-full   border-b border-green-800"></div>
                  </div>
                  {renderCarousel(product.catId[0])}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;

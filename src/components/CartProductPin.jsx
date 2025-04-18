import React, { useState, useEffect } from "react";
import CartContainer from "../components/CartContainer";
import { MdLocalGroceryStore } from "react-icons/md";
import NumberFormatExample from "../constant/NumberFormatExample";
import axios from "axios";
import { APIURL } from "../context/SampleContext";
import { PutApi } from "../constant/Api";

const CartProductPin = ({
  visibilty,
  products,
  onProductRemove,
  onProductClear,
  onClose,
  onQuantityChange,
  qty,
  tot,
}) => {
  // const [product, setProduct] = useState({});
  // const fetchProductById = async (productId) => {
  //   const token = "token 218d68b6dfe280a288a396352f7d720a18a00997";
  //   const axiosInstance = axios.create({
  //     headers: {
  //       Authorization: `${token}`,
  //     },
  //   });

  //   try {
  //     const response = await axiosInstance.get(
  //       `https://${APIURL}/get_SiteProductNew/${productId}/`
  //     );
  //     console.log(response.data.dtl);
  //     return response.data.dtl;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       // Fetch product data using the id from route parameters
  //       const productData = await fetchProductById(9030);
  //       console.log(productData);

  //       // Check if the product data is available and structured correctly
  //       if (productData.length > 0) {
  //         const productDetail = productData[0]; // Access the first item in the dtl array
  //         if (
  //           Array.isArray(productDetail.imgs) &&
  //           productDetail.imgs.length > 0
  //         ) {
  //           setCurrentImage(productDetail.imgs[0]); // Set the first image
  //         } else {
  //           console.warn("No images found for this product.");
  //         } // Set the first image
  //         setProduct(productDetail); // Set the entire product detail object
  //         console.log(productDetail);
  //       } else {
  //         console.error("Product data is not available");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching product data:", error);
  //     } finally {
  //     }
  //   };

  //   fetchProduct();
  // }, []);
  return (
    <div>
      <button
        onClick={() => onClose(!visibilty)}
        className="fixed top-[30%] z-50 -mt-12 hidden flex-col items-center justify-center rounded bg-green-800 p-3 pt-3.5 text-sm font-semibold text-white shadow-900 right-0 transition-colors duration-200 hover:bg-accent-hover focus:outline-0 lg:flex"
      >
        <span className="flex pb-0.5">
          <div className="flex ltr:ml-2 rtl:mr-2 items-center">
            <MdLocalGroceryStore size={20} />
            <div className="mx-1 text-base">{qty}</div>
            <div>Сагс</div>
          </div>
        </span>
        <span className="flex mt-3 w-full rounded bg-white px-2 py-2 text-teal-600 text-sm">
          {NumberFormatExample(tot)}₮
        </span>
      </button>
      {visibilty && (
        <CartContainer
          visibilty={visibilty}
          products={products}
          onClose={onClose}
          onProductClear={onProductClear}
          onProductRemove={onProductRemove}
          onQuantityChange={onQuantityChange}
          tot={tot}
        />
      )}
    </div>
  );
};

export default CartProductPin;

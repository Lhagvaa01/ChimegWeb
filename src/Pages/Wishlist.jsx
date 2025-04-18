import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import secureLocalStorage from "react-secure-storage";
import NumberFormatExample from "../constant/NumberFormatExample";
import { IoIosCloseCircle } from "react-icons/io";
import { PutApi } from "../constant/Api";

const Wishlist = ({ addProductToCart }) => {
  const [userWishLists, setUserWishLists] = useState([]);
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });
  const [dBProducts, setDBProducts] = useState(() => {
    const storedDBProducts = secureLocalStorage.getItem("pd");
    return storedDBProducts ? JSON.parse(storedDBProducts) : [];
  });

  useEffect(() => {
    if (userInfo && dBProducts) {
      const wishListProducts = userInfo.TCWhishLists.filter((item) =>
        /^\d+$/.test(item)
      ).map((item) => {
        const intValue = parseInt(item);
        return dBProducts.find((product) => product.pk === intValue);
      });
      setUserWishLists(wishListProducts);
    }
  }, [userInfo, dBProducts]);

  const saveUserField = (product) => {
    if (userInfo && userInfo.TCWhishLists) {
      let updatedTCWhishLists;
      const isInWishList = userInfo.TCWhishLists.includes(product.pk);

      if (isInWishList) {
        updatedTCWhishLists = userInfo.TCWhishLists.filter(
          (item) => item !== product.pk
        );
      } else {
        updatedTCWhishLists = [...userInfo.TCWhishLists, product.pk];
      }

      secureLocalStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...userInfo,
          TCWhishLists: updatedTCWhishLists,
        })
      );

      setUserInfo((prev) => ({
        ...prev,
        TCWhishLists: updatedTCWhishLists,
      }));

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

  return (
    <div className="flex flex-col lg:flex-row mt-24 lg:mt-20 lg:mx-16 mx-4 mb-10">
      <UserMenu />

      <div className="w-full lg:w-3/4 p-4">
        <h2 className="text-2xl lg:text-3xl font-bold pb-6">
          Хүслийн жагсаалт
        </h2>

        {userWishLists.length > 0 ? (
          userWishLists.map((item) => (
            <div key={item.pk} className="mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center border rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-center mb-4 sm:mb-0">
                  <img
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-md"
                    src={item.imgs[0]}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{item.name}</div>
                  <div className="flex mt-2">
                    <div className="font-medium">Өнгө:</div>
                    <div className="ml-2">{item.colors}</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-bold">
                    {item.discountPrice === 0
                      ? NumberFormatExample(item.price)
                      : NumberFormatExample(item.discountPrice)}
                    ₮
                  </div>
                  <div className="flex mt-2">
                    <div className="text-red-600 font-medium">Үлдэгдэл:</div>
                    <div className="ml-2 text-red-600">{item.qty}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    type="button"
                    className="text-red-600 mb-2"
                    onClick={() => saveUserField(item)}
                  >
                    <IoIosCloseCircle size={24} />
                  </button>
                  <button
                    onClick={() => addProductToCart(item)}
                    className="w-full bg-gray-100 hover:bg-green-800 text-body-dark hover:text-white rounded-lg px-4 py-2 text-xs md:text-sm font-medium transition"
                  >
                    Сагслах
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Хадгалсан хүслийн жагсаалт байхгүй байна.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import secureLocalStorage from "react-secure-storage";
import { GetApi } from "../constant/Api";
import NumberFormatExample from "../constant/NumberFormatExample";

const OrderDetail = () => {
  const location = useLocation();

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });

  const [pd, setPd] = useState(() => {
    const storedPd = secureLocalStorage.getItem("pd");
    return storedPd ? JSON.parse(storedPd) : null;
  });

  const [userOrderD, setUserOrderD] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    GetApi(`get_UserAddress/${userInfo.id}/`).then((val) => {
      setUserAddress(val.dtl);
    });
    if (
      userInfo.TCUserType == "Admin"
        ? GetApi(`get_UserHistory/0/`).then((val) => {
            setUserOrder(val.dtl);

            const orderPk = location.pathname.split("/")[2];
            setUserOrderD(
              val.dtl.filter((order) => order.pk === parseInt(orderPk))
            );
          })
        : GetApi(`get_UserHistory/${userInfo.id}/`).then((val) => {
            setUserOrder(val.dtl);

            const orderPk = location.pathname.split("/")[2];
            setUserOrderD(
              val.dtl.filter((order) => order.pk === parseInt(orderPk))
            );
          })
    )
      // GetApi(`get_UserHistory/${userInfo.id}/`).then((val) => {
      //   setUserOrder(val.dtl);

      //   const orderPk = location.pathname.split("/")[2];
      //   setUserOrderD(val.dtl.filter((order) => order.pk === parseInt(orderPk)));
      // });
      GetApi(`get_locations/`).then((val) => {
        setLocations(val.dtl);
      });
  }, [userInfo.id, location.pathname]);

  return (
    <div className="flex flex-col lg:flex-row mt-24 lg:mt-36 lg:mx-16 mx-4 mb-10">
      <UserMenu />

      {userOrderD.length ? (
        <div className="w-full lg:w-3/4 p-4">
          <h2 className="text-2xl lg:text-3xl font-bold pb-4">
            Захиалгын дэлгэрэнгүй
          </h2>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-bold text-green-800">
                  {userOrderD[0].TCOrderNumber}
                </span>
                <span className="text-sm text-gray-600">Захиалгын дугаар</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
                <span
                  className={`${
                    userOrderD[0].TCIsPayed
                      ? "text-green-500"
                      : "text-yellow-600"
                  } text-xl sm:text-2xl font-bold`}
                >
                  {userOrderD[0].TCIsPayed ? "Амжилттай" : "Хүлээгдэж байна"}
                </span>
                <span className="text-sm text-gray-600">Төлөв</span>
              </div>
            </div>

            {userOrderD[0].TCOrderedProduct.length ? (
              userOrderD[0].TCOrderedProduct.map((item) => {
                const dProd = pd.find((prod) => prod.pk === item.productId);
                return (
                  <Link
                    key={item.productId}
                    to={`/product-detail/${dProd.itemCode}`}
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center mb-4 p-4 bg-gray-100 shadow rounded-lg">
                      <img
                        src={dProd.imgs[0]}
                        alt={item.productId}
                        className="w-28 h-28 lg:w-36 lg:h-36 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-gray-900 text-lg font-semibold">
                          Барааны нэр: {dProd.name}
                        </h3>
                        <p className="text-gray-900">
                          Барааны код: {dProd.itemCode}
                        </p>
                        {dProd.color_variants?.length == 1 ? (
                          <div></div>
                        ) : (
                          <p>Өнгө: {item.productColor}</p>
                        )}
                        <p className="flex text-gray-800 mt-1">
                          Үнэ:{" "}
                          {dProd.discountPrice === 0
                            ? NumberFormatExample(parseFloat(dProd.price))
                            : NumberFormatExample(
                                parseFloat(dProd.discountPrice)
                              )}
                          ₮<span className="ml-4">Тоо/Ш: {item.quantity}</span>
                        </p>
                      </div>
                      <div className="text-center mt-4 lg:mt-0">
                        <div className="font-semibold">Нийт Дүн</div>
                        <div className="flex font-bold">
                          {dProd.discountPrice === 0
                            ? NumberFormatExample(
                                parseFloat(dProd.price * item.quantity)
                              )
                            : NumberFormatExample(
                                parseFloat(dProd.discountPrice * item.quantity)
                              )}
                          ₮
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>
                <p>Хадгалсан хүслийн жагсаалт байхгүй байна.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full p-4">
          <p>Хадгалсан хүслийн жагсаалт байхгүй байна.</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import secureLocalStorage from "react-secure-storage";
import { GetApi } from "../constant/Api";
import { formatDate } from "../context/SampleContext";
import NumberFormatExample from "../constant/NumberFormatExample";

const OrderHistory = () => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });

  const [userOrder, setUserOrder] = useState([]);
  const [userAddress, setUserAddress] = useState([]);

  useEffect(() => {
    GetApi(`get_UserAddress/${userInfo.id}/`).then((val) => {
      setUserAddress(val.dtl);
    });
    GetApi(`get_UserHistory/${userInfo.id}/`).then((val) => {
      setUserOrder(val.dtl);
    });
  }, [userInfo.id]);

  return (
    <div className="flex flex-col lg:flex-row mt-40 lg:mx-16 mx-4 mb-10">
      <UserMenu />

      <div className="w-full lg:w-3/4 p-4">
        <h2 className="text-2xl font-bold pb-4">Захиалгын түүх</h2>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
              <span className="font-semibold text-blue-600 text-lg sm:text-xl">
                {userOrder.length}
              </span>
              <span className="text-sm text-gray-600">Нийт захиалга</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
              <span className="font-semibold text-green-800 text-lg sm:text-xl">
                {userOrder.filter((order) => order.TCIsPayed === true).length}
              </span>
              <span className="text-sm text-gray-600">Төлөгдсөн захиалга</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
              <span className="font-semibold text-yellow-600 text-lg sm:text-xl">
                {userOrder.filter((order) => order.TCIsPayed === false).length}
              </span>
              <span className="text-sm text-gray-600">
                Хүлээгдэж буй захиалга
              </span>
            </div>
          </div>

          {userOrder.length ? (
            userOrder
              .sort(
                (a, b) => new Date(b.TCCreatedDate) - new Date(a.TCCreatedDate)
              )
              .map((item) => (
                <Link key={item.pk} to={`/OrderDetail/${item.pk}`}>
                  <div
                    className={`border-l-8 ${
                      item.TCIsPayed ? "border-green-500" : "border-yellow-600"
                    } mb-4 p-4 bg-gray-100 shadow rounded-lg flex flex-col lg:flex-row items-start lg:items-center justify-between`}
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="grid">
                        <h3 className="text-gray-900 text-lg font-semibold">
                          Захиалгын дугаар: {item.TCOrderNumber}
                        </h3>
                        <p className="text-gray-900">Хаяг:</p>
                        <p className="text-gray-900 text-sm">
                          {userAddress.find(
                            (addr) => addr.id === item.TCAddress
                          )
                            ? userAddress.find(
                                (addr) => addr.id === item.TCAddress
                              ).TCDetailAddress
                            : ""}
                        </p>
                        <div className="text-gray-800 mt-1">
                          <p>{formatDate(item.TCCreatedDate)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-left lg:mr-6 mt-4 lg:mt-0">
                      <div className="text-gray-900 font-semibold">Төлөв</div>
                      <div
                        className={`${
                          item.TCIsPayed ? "text-green-500" : "text-yellow-600"
                        }`}
                      >
                        {item.TCIsPayed ? "Амжилттай" : "Хүлээгдэж байна"}
                      </div>
                    </div>
                    <div className="flex lg:grid  text-center mt-4 lg:mt-0">
                      <div className="font-semibold">Нийт Дүн</div>
                      <div className="flex pl-5 lg:pl-0 font-bold">
                        {NumberFormatExample(parseFloat(item.TCTotalAmount))}
                        <p>₮</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <div>
              <p>Хадгалсан хүслийн жагсаалт байхгүй байна.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

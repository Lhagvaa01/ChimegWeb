import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { PostApi } from "../constant/Api";
import NumberFormatExample from "../constant/NumberFormatExample";
import { useNavigate, useLocation } from "react-router-dom";
import { errorToast } from "../constant/ReacrToast";
import { Card, Image } from "antd";
import StepProgress from "./StepProgress";

const Payments = ({ products, tot }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  const isAddress = state && state.isAddress;

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const [selectedCard, setSelectedCard] = useState(1);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const gridStyle = {
    border: "1px solid #f0f0f0",
    cursor: "pointer",
  };

  const [userOrder, setUserOrder] = useState(() => {
    const storedUserOrder = secureLocalStorage.getItem("userOrder");
    return storedUserOrder ? JSON.parse(storedUserOrder) : {};
  });

  useEffect(() => {
    secureLocalStorage.setItem("userOrder", JSON.stringify(userOrder));
    scrollUp();
  }, [userOrder]);

  const [orderNum, setOrderNum] = useState(() => {
    const orderNum = secureLocalStorage.getItem("orderNum");
    return orderNum ? JSON.parse(orderNum) : null;
  });

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const payCheck = () => {
    if (selectedCard != null) {
      let TCOrderedProductData = [];
      for (let i = 0; i < products.length; i++) {
        TCOrderedProductData.push({
          product: products[i].selectedColor.item_code,
          quantity: products[i].count,
        });
      }
      // console.log(TCOrderedProductData);
      const isCompany = userInfo.TCIsCompany ?? false; // Use `false` if undefined

      const data = {
        TCUserPk: userInfo.id,
        TCAddress: isAddress,
        TCTotalAmount: tot,
        TCOrderedProduct: TCOrderedProductData,
        TCOrderNumber: orderNum,
        ...(isCompany && {
          TCIsCompany: true,
          TCCompanyRd: userInfo.TCCompanyRd || null,
          TCCompanyName: userInfo.TCCompanyName || null,
        }),
      };

      // console.log("userInfo:", userInfo);
      // console.log("isCompany:", isCompany);
      // console.log("data:", data);

      PostApi(`post_UserHistory/`, data).then((val) => {
        if (val.statusCode == 200) {
          setUserOrder(val.dtl);
          if (selectedCard === 1) {
            navigate(`/Bank`);
          } else {
            navigate(`/Qpay`);
          }
        } else {
          errorToast("Алдаа гарлаа та ахин оролдоно уу!");
        }
      });
    } else {
      errorToast("Төлбөрийн хэлбэрээ сонгоно уу!");
    }
  };

  return (
    <div className="mt-10 mx-4 lg:mt-40 lg:mx-36">
      <StepProgress index={2} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 m-6">
          <Card title="Төлбөрийн хэлбэрээ сонгоно уу">
            {/* <Card.Grid
              style={{
                ...gridStyle,
                backgroundColor: selectedCard === 0 ? "#e6f7ff" : "white",
                width: "100%",
              }}
              onClick={() => handleCardClick(0)}
            >
              <div className="flex items-center">
                <Image
                  preview={false}
                  width={100}
                  src="https://qpay.mn/q/img/brand-logo.png"
                />
                <div className="text-sm pl-2">
                  ДАНСААР эсвэл QR кодоор ШИЛЖҮҮЛЭХ Төлбөрийг дансанд шилжүүлэх,
                  Интернет банк, мобайл банк, QR код, дансаар төлбөр төлөх
                </div>
              </div>
            </Card.Grid> */}
            <Card.Grid
              style={{
                ...gridStyle,
                backgroundColor: selectedCard === 1 ? "#e6f7fb" : "white",
                width: "100%",
              }}
              onClick={() => handleCardClick(1)}
            >
              <div className="flex items-center">
                <Image
                  preview={false}
                  width={100}
                  src="https://cdn-icons-png.flaticon.com/512/10364/10364441.png"
                />
                <div className="text-sm pl-2">
                  Дансаар шилжүүлэх: Манай дэлгүүрийн харилцах дансруу та
                  шилжүүлгэ хийнэ.
                </div>
              </div>
            </Card.Grid>
          </Card>
        </div>
        <div className="m-6">
          <h5 className="font-bold text-xl">Төлбөрийн мэдээлэл</h5>
          <div className="border-2 mt-5 rounded-xl shadow-sm p-3">
            <div className="font-semibold border-b pb-2">Бүтээгдэхүүн</div>
            {products.map((item) => (
              <div key={item.itemCode} className="flex justify-between pt-2">
                <div className="flex w-full justify-between">
                  {/* Column 1: Product Name */}
                  <div className="w-2/4 text-gray-500 truncate">
                    {item.name}
                  </div>

                  {/* Column 2: Product Count */}
                  <div className="w-1/4 text-center text-gray-500">
                    <div className="border rounded-md w-10 mx-auto bg-slate-200">
                      x{item.count}
                    </div>
                  </div>

                  {/* Column 3: Product Price */}
                  <div className="flex w-1/3 text-right font-medium justify-end">
                    {item.discountPrice === 0
                      ? NumberFormatExample(
                          parseFloat(item?.price) * item?.count
                        )
                      : NumberFormatExample(
                          parseFloat(item?.discountPrice) * item?.count
                        )}
                    ₮
                  </div>
                </div>
              </div>
            ))}

            {/* Total Section */}
            <div>
              <div className="border-t my-3" />
              {tot >= 1000000 ? (
                <div />
              ) : (
                <div className="flex justify-between">
                  <div className="font-semibold">Хүргэлт</div>
                  <div className="flex font-bold">11,000₮</div>
                </div>
              )}

              <div className="flex justify-between">
                <div className="font-semibold">Нийт төлөх дүн</div>
                <div className="flex font-bold">
                  {NumberFormatExample(tot >= 1000000 ? tot : tot + 11000)}₮
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <button
              onClick={payCheck}
              className="bg-blue-500 text-white p-3 mt-4 rounded-lg"
            >
              Захиалга дуусгах
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-white text-black border-2 border-slate-400 p-3 mt-4 rounded-lg"
            >
              Өмнөх алхам руу буцах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;

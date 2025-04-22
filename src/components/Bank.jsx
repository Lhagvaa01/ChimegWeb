import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { PostApi, GetApi, PutApi } from "../constant/Api";
import NumberFormatExample from "../constant/NumberFormatExample";
import { Link } from "react-router-dom";
import { Card } from "antd";
import icon from "../images/Logo.png";
import PayCheck from "./layout/PayCheck";
import axios from "axios";
import { successToast, errorToast } from "../constant/ReacrToast";
import { APIURL } from "../context/SampleContext";
import { useNavigate } from "react-router-dom";
import StepProgress from "./StepProgress";

const Bank = ({ products, tot, dBproduct, onProductClear }) => {
  const navigate = useNavigate();
  const [orderNum, setOrderNum] = useState(() => {
    const orderNum = secureLocalStorage.getItem("orderNum");
    return orderNum ? JSON.parse(orderNum) : null;
  });

  const GetPay = async () => {
    try {
      GetApi(`api/CheckOrder/?TCOrderNumber=${orderNum}&TCTotalAmount=${tot}`)
        .then((val) => {
          if (val.dtl === "Order Confirm") {
            successToast("Төлбөр төлөгдсөн");
            navigate(`/OrderHistory`);
            secureLocalStorage.removeItem("orderNum");
            onProductClear();
          } else {
            errorToast("Төлбөр төлөгдөөгүй байна!");
          }
        })
        .catch((error) => {
          errorToast(error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    scrollUp();
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="mt-20 md:mx-4 lg:mt-40 lg:mx-36">
      <StepProgress index={3} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-lg">
        <div className="lg:col-span-2 m-6">
          <h5 className="font-bold text-xl mx-4">Дансаар шилжүүлэх</h5>
          <div className="grid w-full text-start">
            <div className="flex pt-5 w-full justify-center">
              <Card
                className="bg-gray-200 text-center text-lg"
                title={
                  <div className="text-txt-color">
                    Захиалгын дугаар:{" "}
                    <strong className="text-red-500 text-lg">{orderNum}</strong>
                  </div>
                }
                bordered={true}
                style={{
                  width: "90%",
                  backgroundColor: "#F4F6FA",
                }}
              >
                <p className="text-txt-color">Банкны нэр: </p>
                <p className="text-txt-color">Хүлээн авагч: </p>
                {/* <p className="text-txt-color">Дансны дугаар: 340 517 21 95</p> */}
                <p className="text-txt-color">Дансны дугаар IBAN:</p>
                <div className="flex justify-center text-txt-color">
                  <p>Шилжүүлэх дүн: </p>
                  <p className="text-txt-color">
                    {" "}
                    {NumberFormatExample(tot >= 1000000 ? tot : tot + 11000)}
                  </p>
                  <p className="text-txt-color">₮</p>
                </div>
                <p className="text-txt-color">
                  Гүйлгээний утга:{" "}
                  <strong className="text-red-500">{orderNum}</strong>
                </p>
              </Card>
            </div>
            <div className="bg-green-400 border rounded-md p-3 md:m-10 m-4">
              <div className="text-sm">
                • Төлбөр төлсөн бол Төлбөр шалгах товчийг дарна уу.
              </div>
              <div className="text-sm">
                • Гүйлгээний утга дээр зөвхөн <strong>{orderNum}</strong>{" "}
                дугаарыг бичсэнээр төлбөр баталгаажна.
              </div>
              <div className="text-sm">
                • Танд ямар нэг асуух зүйл байгаа бол манай 7766-9002 утсаар
                хологдоно уу.
              </div>
            </div>
          </div>
        </div>
        <div className="m-6">
          <h5 className="font-bold lg:text-base xl:text-xl">
            Төлбөрийн мэдээлэл
          </h5>
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
              onClick={() => GetPay()}
              className=" bg-green-800 text-white  p-3 mt-4 rounded-lg "
            >
              {/* <Link to="/">Төлбөр шалгах</Link> */}
              Төлбөр шалгах
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

export default Bank;

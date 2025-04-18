import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import { QRCode } from "antd";
import icon from "../images/Logo.png";
import PayCheck from "./layout/PayCheck";
import NumberFormatExample from "../constant/NumberFormatExample";

const Qpay = ({ products, tot, dBproduct }) => {
  const [userOrder, setUserOrder] = useState(() => {
    const storedUserOrder = secureLocalStorage.getItem("userOrder");
    return storedUserOrder ? JSON.parse(storedUserOrder) : null;
  });

  return (
    <div className="mt-10 mx-4 sm:mt-20 sm:mx-10 md:mt-40 md:mx-36 grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 text-lg">
      {/* QR Code Section */}
      <div className="col-span-2 m-4 lg:m-6">
        <h5 className="font-bold text-xl">QPAY Төлбөр төлөх</h5>
        <div className="grid text-start">
          <div className="flex pt-5 justify-center">
            <QRCode
              size={200}
              errorLevel="H"
              value="http://202.131.237.185:3035/"
              icon={icon}
            />
          </div>
          <div className="bg-green-400 border rounded-md p-3 m-6 sm:m-10">
            <div className="text-sm">
              • Та аль ч банкны аппликэшнээс QPay-г сонгон дээр байгаа QR кодыг
              уншуулан төлбөрөө төлөөрэй.
            </div>
            <div className="text-sm">
              • Төлбөр төлсөн бол Төлбөр шалгах товчийг дарна уу.
            </div>
            <div className="text-sm">
              • Танд ямар нэг асуух зүйл байгаа бол манай 7766-9002 утсаар
              хологдоно уу.
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information Section */}
      <div className="m-4 lg:m-6">
        <h5 className="font-bold text-xl">Төлбөрийн мэдээлэл</h5>
        <div className="border-2 mt-5 rounded-xl shadow-sm p-3">
          <div className="font-semibold border-b pb-2">Бүтээгдэхүүн</div>
          {products.map((item) => (
            <div key={item.itemCode} className="flex justify-between pt-2">
              <div className="flex w-full justify-between">
                <div className="w-2/4 text-gray-500 truncate">{item.name}</div>
                <div className="w-1/4 text-center text-gray-500">
                  <div className="border rounded-md w-10 mx-auto bg-slate-200">
                    x{item.count}
                  </div>
                </div>
                <div className="flex w-1/3 text-right font-medium justify-end">
                  {item.discountPrice === 0
                    ? NumberFormatExample(parseFloat(item?.price) * item?.count)
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
            <div className="flex justify-between">
              <div className="font-semibold">Нийт төлөх дүн</div>
              <div className="flex font-bold">{NumberFormatExample(tot)}₮</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4 mt-4">
          <button
            onClick={() => PayCheck(userOrder.TCOrderNumber)}
            className="bg-green-800 text-white p-3 rounded-lg"
          >
            <Link to="/">Төлбөр шалгах</Link>
          </button>
          <button className="bg-white text-black border-2 border-slate-400 p-3 rounded-lg">
            Өмнөх алхам руу буцах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qpay;

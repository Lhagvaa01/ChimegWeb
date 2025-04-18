import React, { useEffect, useState } from "react";
import NumberFormatExample from "../constant/NumberFormatExample";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import QuickViewModal from "../components/QuickViewModal";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../constant/ReacrToast";
import secureLocalStorage from "react-secure-storage";
import { GetApi } from "../constant/Api";
import { OderNumber } from "../context/SampleContext";
import StepProgress from "../components/StepProgress";

const PayOut = ({
  products,
  tot,
  dBgroup,
  onQuantityChange,
  onProductClear,
}) => {
  useEffect(() => {
    // secureLocalStorage.remove("shopping-cart");

    scrollUp();
    // console.log(products);
  }, [products]);

  const findCat = (prod) => {
    const response = (dBgroup || []).filter(
      (obj) => obj.catId === parseInt(prod.catId[1][0])
    );
    if (response.length > 0) {
      return response[0].catName;
    } else {
      console.error(`Category not found for product with catId: ${prod.catId}`);
      return "Unknown Category";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const closeModal = (
    e,
    companyName,
    companyRegister,
    companyPhone,
    companyMail
  ) => {
    e.preventDefault();
    setIsModalOpen(false);
    setModalData({ companyName, companyRegister, companyPhone, companyMail });
    handleSearchSubmit(
      e,
      companyName,
      companyRegister,
      companyPhone,
      companyMail
    );
  };

  const handleSearchSubmit = (
    e,
    companyName,
    companyRegister,
    companyPhone,
    companyMail
  ) => {
    if (e) {
      e.preventDefault();
    }
    navigate(`/PriceOffer`, {
      state: { companyName, companyRegister, companyPhone, companyMail },
    });
  };

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const { orderNum, setOrderNum } = OderNumber();

  const payProducts = () => {
    if (userInfo != null) {
      GetApi(`get_InvoiceNumber/S${userInfo.id}/1/`).then((val) => {
        if (val.statusCode == 200) {
          secureLocalStorage.setItem("orderNum", JSON.stringify(val.dtl));
          navigate(`/OrderAddress`);
        } else {
          errorToast("Алдаа гарлаа та ахин оролдоно уу!");
        }
      });
    } else {
      errorToast(
        "Өөрийн хэрэглэгчээр нэвтэрсэний дараа худалдан авалт хийнэ үү!"
      );
      navigate(`/Login`);
    }
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="container mx-auto mt-40 px-5 md:px-24 md:py-5 pb-5">
      <StepProgress index={0} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center border rounded-md bg-green-800 text-white px-3 h-12">
            <div>Таны сагс</div>
            <div>
              <motion.p
                whileTap={{ scale: 0.75 }}
                className="flex items-center gap-2 p-1 px-2 my-2 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
                onClick={onProductClear}
              >
                Сагс хоослох <RiRefreshFill />
              </motion.p>
            </div>
          </div>
          <div>
            {products.map((item) => (
              <div
                key={item.itemCode}
                className="grid grid-cols-1 md:grid-cols-6 items-center justify-center my-5 p-4 border-2 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-center w-full h-32 border rounded-xl">
                  <img
                    className="inset-0 w-28 h-28 object-cover"
                    src={item.imgs[0]}
                    alt={item.name}
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <div className="text-gray-500 text-sm">{findCat(item)}</div>
                  <div className="text-lg">{item.name}</div>
                  {item.color_variants?.length == 1 ? (
                    <div></div>
                  ) : (
                    <div className="flex mt-3 gap-2 items-center">
                      <div>Өнгө:</div>
                      {/* <div className="ml-1">{item.color}</div> */}
                      <div
                        key={
                          item.selectedColor
                            ? item.selectedColor.id
                            : item.color_variants[0].id
                        }
                        style={{
                          backgroundColor: item.selectedColor
                            ? item.selectedColor.hex_value
                            : item.color_variants[0].hex_value,
                        }}
                        className="flex border-2 h-5 w-5 rounded-full cursor-pointer transition-transform transform border-green-800 shadow-xl scale-110 hover:scale-110"
                        title={
                          item.selectedColor
                            ? item.selectedColor.ColorName
                            : item.color_variants[0].ColorName
                        }
                      >
                        <div className="flex items-center ml-8">
                          {item.selectedColor
                            ? item.selectedColor.ColorName
                            : item.color_variants[0].ColorName}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <div className="flex text-base md:text-xl font-bold">
                    <div className="flex ">
                      {item.discountPrice === 0
                        ? NumberFormatExample(item.price)
                        : NumberFormatExample(item.discountPrice)}
                      ₮
                    </div>
                    <div className="flex md:pl-5 pl-5">
                      {item.count !== 1 ? (
                        <button
                          className="bg-gray-200 text-gray-600 px-2 rounded-l-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                          onClick={() => onQuantityChange(item.itemCode, false)}
                        >
                          -
                        </button>
                      ) : (
                        <button className="bg-gray-300 text-gray-600 px-2 rounded-l-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400">
                          -
                        </button>
                      )}
                      <input
                        type="text"
                        className="w-10 text-center text-md border-gray-200 focus:border-gray-400 focus:outline-none"
                        value={item.count}
                        readOnly
                      />
                      <button
                        className="bg-gray-200 text-gray-600 px-2 rounded-r-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                        onClick={() => onQuantityChange(item.itemCode, true)}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex md:pl-5 pl-5">
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
                  <div className="flex">
                    <div className="text-red-600">Үлдэгдэл:</div>
                    <div className="ml-1 text-red-600">
                      {item.selectedColor
                        ? item.selectedColor.qty
                        : item.color_variants[0].qty}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center border rounded-md bg-green-800 text-white px-3 h-12">
            <div>Төлбөрийн мэдээлэл</div>
          </div>
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
            {/* <div>
              <div className="border-t my-3" />
              <div className="flex justify-between">
                <div className="font-semibold">Нийт төлөх дүн</div>
                <div className="flex font-bold">
                  {NumberFormatExample(tot)}₮
                </div>
              </div>
            </div> */}
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

          {/* <button
            onClick={openModal}
            className="border-2 mt-5 w-full rounded-xl shadow-sm p-3 bg-green-800 text-center text-white font-semibold"
          >
            Нэхэмжлэл авах
          </button> */}
          <button
            onClick={() => payProducts()}
            className="border-2 mt-5 w-full rounded-xl shadow-sm p-3 bg-green-800 text-center text-white font-semibold"
          >
            Төлбөр төлөх
          </button>
          <QuickViewModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default PayOut;

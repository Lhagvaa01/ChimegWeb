import React, { useState, useEffect } from "react";
import NumberFormatExample from "../constant/NumberFormatExample";
import { PostApi, GetApi, PutApi } from "../constant/Api";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../constant/ReacrToast";
import AddressModal from "./layout/AddressModal";
import StepProgress from "./StepProgress";

const OrderAddress = ({ products, tot, dBproduct }) => {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [check, setchecked] = useState(true);

  const [showPolicy, setShowPolicy] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const clickedcheck = () => {
    setchecked(!check);
  };
  const [isCompany, setIsCompany] = useState(false);
  const clickedEbarimt = () => {
    setUserInfo({ ...userInfo, ["TCIsCompany"]: true });
    setIsCompany(!isCompany);
  };
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const [activeDiv, setActiveDiv] = useState(null);

  const handleClick = (divId) => {
    setActiveDiv(divId === activeDiv ? null : divId);
    // console.log(`handleClick = ${divId}`);
  };

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const [userAddress, setUserAddress] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    setIsAccepted(false);
    GetApi(`get_UserAddress/${userInfo.id}/`).then((val) => {
      setUserAddress(val.dtl);
    });
    GetApi(`get_locations/`).then((val) => {
      setLocations(val.dtl);
    });
  }, []);

  const addressRemove = () => {};
  const [isAddress, setIsAddress] = useState(0);
  const clickedAddress = (id) => {
    setIsAddress((prevAddress) => {
      // console.log(isAddress);
      return prevAddress === id ? 0 : id;
    });
  };

  const payMents = () => {
    if (!isAccepted) {
      setShowPolicy(true);
      errorToast("Та үйлчилгээний нөхцөлтэй танцаад Зөвшөөрөх дарна уу!");
    } else {
      if (isAddress != 0) {
        // console.log(userInfo);
        secureLocalStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate(`/Payments`, { state: { isAddress: isAddress } });
      } else {
        errorToast("Хүргэлтээр авах хаягаа сонгоно уу!");
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressPk, setAddressPk] = useState(0);

  const closeModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    // setModalData({ companyName, companyRegister, companyPhone, companyMail });
  };

  const editAddress = (pk, isOpen) => {
    // console.log(pk);
    setAddressPk(pk);
    setIsModalOpen(isOpen);
  };

  const [isDelivery, setIsDelivery] = useState(true);

  const toggleOption = () => {
    setIsDelivery(!isDelivery);
  };

  const acceptPolicy = () => {
    setIsAccepted(true);
    setShowPolicy(false);
  };

  const openAddressModal = () => {
    setAddressPk(0);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-40 mx-4 lg:mt-40 lg:mx-36">
      <StepProgress index={1} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {showPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-5">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
              <h2 className="font-bold text-xl text-center mb-4">
                Бараа буцаах болон солих журам
              </h2>
              <p className="text-sm text-justify leading-relaxed mb-5">
                1. Хэрэглэгч 48 цагийн дотор худалдан авсан бараагаа буцаалт
                хийх боломжтой.
                <br />
                2. Хэрэглэгч 72 цагийн дотор худалдан авсан бараагаа өөр
                бараагаар солих боломжтой.
                <br />
                3. Худалдан авагч төлбөр төлсөн баримт болон И-баримтын
                буцаалтыг баталгаажуулсан байх.
                <br />
                4. Барааны хайрцаг, сав, дагалдах хэрэгсэл бүрэн бүтэн байх.
                Хайрцаг сав байхгүй бол 10 хувь, дагалдах хэрэгсэл байхгүй бол
                20 хувь суутгах болохыг АНХААРНА УУ!
                <br />
                5. Хэрэглэгчийн буруутай үйлдлээс гэмтсэн, бараан дээрх лац
                хөдөлсөн тохиолдолд тухайн барааг буцаалт хийхгүй.
                <br />
                6. Барааг хүргэлтээр авсан тохиолдолд хүргэлтийн төлбөр буцаан
                олгогдохгүй.
                <br />
                7. Худалдан авсан бараагаа журамд заасан хугацаанд буцаах, солих
                тохиолдолд худалдан авагч манай дэлгүүр дээр өөрөө авч ирнэ.
                <br />
                8. 1 сая төгрөгнөөс дээш үнийн дүнтэй бараа 24-48 цагийн дотор
                Улаанбаатар хот дотор хүргэлт үнэгүй.
                <br />
                9. 1 сая төгрөгнөөс доош үнийн дүнд хүргэлтийн төлбөр нэмэгдэх
                болно
                <br />
                Та сонголоо зөв хийнэ үү.
              </p>
              <button
                onClick={acceptPolicy}
                className="block w-full bg-green-800 hover:bg-green-700 text-white py-2 rounded-md text-center font-semibold"
              >
                Зөвшөөрөх
              </button>
            </div>
          </div>
        )}
        <div className="lg:col-span-2">
          <h5 className="font-bold text-xl ml-6">Захиалагчийн мэдээлэл</h5>
          <div className="p-4 m-6 bg-white rounded-lg shadow-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="m-2">
                <h5>Нэр:</h5>
                <input
                  type="search"
                  id="default-search"
                  className="flex-1 w-full p-4 text-sm rounded-lg bg-white text-black border-2 border-slate-400"
                  placeholder="Нэр"
                  value={userInfo.TCUserName}
                  name="TCUserName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="m-2">
                <h5>Овог:</h5>
                <input
                  type="search"
                  id="default-search"
                  className="flex-1 w-full p-4 text-sm rounded-lg bg-white text-black border-2 border-slate-400"
                  placeholder="Овог"
                  value={userInfo.TCUserName}
                  name="TCUserName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="m-2">
                <h5>Утасны дугаар:</h5>
                <input
                  type="search"
                  id="default-search"
                  className="flex-1 w-full p-4 text-sm rounded-lg bg-white text-black border-2 border-slate-400"
                  placeholder="Утасны дугаар"
                  value={userInfo.TCPhoneNumber}
                  name="TCPhoneNumber"
                  onChange={handleInputChange}
                />
              </div>
              <div className="m-2">
                <h5>И-Мэйл хаяг:</h5>
                <input
                  type="search"
                  className="flex-1 w-full p-4 text-sm rounded-lg bg-white text-black border-2 border-slate-400"
                  placeholder="И-Мэйл хаяг"
                  value={userInfo.TCEmail}
                  name="TCEmail"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="m-2">
              <div className="bg-gray-200 w-full p-4 mt-3 rounded-lg">
                <input
                  value={isCompany}
                  defaultChecked={false}
                  onChange={clickedEbarimt}
                  type="checkbox"
                />
                И-баримт албан байгууллагаар авах
              </div>
              {isCompany ? (
                <div className="flex w-full">
                  <div className="m-2 w-1/2">
                    <h5>Регистерийн дугаар:</h5>
                    <input
                      type="search"
                      id="default-search"
                      className="flex-1 w-full p-4 text-sm rounded-lg bg-white text-black border-2 border-slate-400"
                      placeholder="Регистерийн дугаар оруулна уу"
                      value={userInfo.TCCompanyRd}
                      name="TCCompanyRd"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="m-2 w-1/2">
                    <h5>Компани нэр:</h5>
                    <input
                      type="search"
                      className="flex-1 w-full p-4 text-sm rounded-lg bg-white text-black border-2 border-slate-400"
                      placeholder="Компани нэр оруулна уу"
                      value={userInfo.TCCompanyName}
                      name="TCCompanyName"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ) : null}
              {/* <div className="flex justify-between mt-5">
                <button
                  onClick={() => setIsDelivery(true)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    isDelivery
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Хүргэлтээр авах
                </button>
                <button
                  onClick={() => setIsDelivery(false)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    !isDelivery
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Дэлгүүрээс очиж авах
                </button>
              </div> */}
            </div>
          </div>

          <div>
            <h5 className="ml-6 font-bold text-xl">Хүргэлтийн хаяг</h5>
            <div className="pt-5">
              <button
                onClick={openAddressModal}
                type="button"
                className="px-4 py-2 bg-green-800 text-white rounded-md"
              >
                Хаяг нэмэх
              </button>
            </div>
            {userAddress != null ? (
              userAddress.map((item) => (
                <div className="border rounded-xl p-5 my-5 mx-6 ">
                  <div className="">
                    <div className="text-lg font-semibold pb-3">
                      {(() => {
                        const filteredLocation = locations.find(
                          (location) => location.id === item.TCCityLocation
                        );
                        return filteredLocation ? filteredLocation.name : null;
                      })()}
                    </div>
                    <div className="text-xs pb-2">{item.TCDetailAddress}</div>
                    <div className="flex pb-3">
                      <div className="bg-gray-100 rounded mr-3 p-1">
                        {item.TCAddressName}
                      </div>
                      <div className="bg-gray-100 rounded p-1">
                        <a
                          href={item.TCGoogleMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Map Линк
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <button
                          type="button"
                          className="text-black"
                          onClick={() => {
                            addressRemove();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="w-0.5 h-5 bg-gray-500 mx-2 rounded-md"></div>
                      <div>
                        <button
                          onClick={() => editAddress(item.id, true)}
                          type="button"
                          className="text-black"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center pt-2">
                    <input
                      checked={isAddress === item.id}
                      defaultChecked={false}
                      onChange={() => clickedAddress(item.id)}
                      type="checkbox"
                    />
                    <div className="pl-2 text-sm text-red-700">
                      Хүргэх хаягаа сонгоно уу?
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div> </div>
            )}
          </div>
        </div>

        <AddressModal
          isOpen={isModalOpen}
          onClose={closeModal}
          addressPk={addressPk}
        />
        <div className="mx-6">
          <h5 className="font-bold text-xl ">Төлбөрийн мэдээлэл</h5>
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
              onClick={() => payMents()}
              className="border-2 mt-5 w-full rounded-xl shadow-sm p-3 bg-green-800 text-center text-white font-semibold"
            >
              Үргэлжлүүлэх
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

export default OrderAddress;

import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import UserMenu from "../components/UserMenu";
import secureLocalStorage from "react-secure-storage";
import { GetApi, PutApi, PostApi } from "../constant/Api";
import AddressModal from "../components/layout/AddressModal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [locations, setLocations] = useState([]);
  const [addressPk, setAddressPk] = useState(0);

  useEffect(() => {
    if (userInfo) {
      GetApi(`get_UserAddress/${userInfo.id}/`)
        .then((val) => setUserAddress(val.dtl))
        .catch(() => setUserAddress(null));
      GetApi(`get_locations/`).then((val) => setLocations(val.dtl));
    }
  }, [userInfo, isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const saveUserField = () => {
    secureLocalStorage.setItem("userInfo", JSON.stringify(userInfo));
    PutApi(`put_EditUser/${userInfo.id}/`, JSON.stringify(userInfo));
  };

  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsModalOpen(false);
  };

  const editAddress = (pk, isOpen) => {
    setAddressPk(pk);
    setIsModalOpen(isOpen);
  };

  const addressRemove = (pk) => {
    PostApi(`post_DelUserAddress/${pk}/`)
      .then((val) => {
        // console.log(val);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const openAddressModal = () => {
    setAddressPk(0);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* Desktop */}
      <div className="hidden md:flex mt-40 mx-10 lg:mx-44">
        <UserMenu />
        <div className="w-full p-4 ">
          <h2 className="text-2xl font-bold pb-2">Хувийн мэдээлэл</h2>
          <p className="text-gray-600">Холбоо барих мэдээлэл</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              { label: "Нэр", name: "TCUserName", value: userInfo?.TCUserName },
              {
                label: "Э-Мэйл хаяг",
                name: "TCEmail",
                value: userInfo?.TCEmail,
              },
              {
                label: "Утасны дугаар",
                name: "TCPhoneNumber",
                value: userInfo?.TCPhoneNumber,
              },
              {
                label: "Нууц үг",
                name: "TCPassword",
                value: userInfo?.TCPassword,
              },
            ].map(({ label, name, value }, index) => (
              <div key={index} className="relative mb-4">
                <label className="text-sm font-medium mb-1 block">
                  {label}
                </label>
                <div className="flex items-center border-b border-gray-300">
                  <input
                    type={
                      name === "TCPassword" && showPassword
                        ? "password"
                        : "text"
                    }
                    className="font-semibold w-full h-10 px-4"
                    name={name}
                    value={value || ""}
                    onChange={handleInputChange}
                  />
                  {name === "TCPassword" && (
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex pt-5 justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-green-800 text-white rounded-md"
              onClick={saveUserField}
            >
              Хадгалах
            </button>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Хүргэх хаяг</h2>
            <div className="pt-5">
              <button
                onClick={openAddressModal}
                type="button"
                className="px-4 py-2 bg-green-800 text-white rounded-md"
              >
                Хаяг нэмэх
              </button>
            </div>
            {userAddress?.length ? (
              userAddress.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl w-full p-5 my-5"
                >
                  <div className="text-lg font-semibold pb-3">
                    {locations.find(
                      (location) => location.id === item.TCCityLocation
                    )?.name || "Unknown"}
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
                    <button
                      type="button"
                      className="text-black mr-4"
                      onClick={() => addressRemove(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="text-black"
                      onClick={() => editAddress(item.id, true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600">No addresses available</div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden mt-20">
        <UserMenu />
        <div className="w-full p-4 ">
          <h2 className="text-2xl font-bold pb-2 text-center">
            Хувийн мэдээлэл
          </h2>
          <div className="grid grid-cols-1 gap-4 bg-gray-100 rounded-md p-3 shadow-md">
            {[
              { label: "Нэр", name: "TCUserName", value: userInfo?.TCUserName },
              {
                label: "Э-Мэйл хаяг",
                name: "TCEmail",
                value: userInfo?.TCEmail,
              },
              {
                label: "Утасны дугаар",
                name: "TCPhoneNumber",
                value: userInfo?.TCPhoneNumber,
              },
              {
                label: "Нууц үг",
                name: "TCPassword",
                value: userInfo?.TCPassword,
              },
            ].map(({ label, name, value }, index) => (
              <div key={index} className="relative mb-4">
                <label className="text-sm font-medium mb-1 block">
                  {label}
                </label>
                <div className="flex items-center border-b border-gray-300">
                  <input
                    type={
                      name === "TCPassword" && showPassword
                        ? "password"
                        : "text"
                    }
                    className="font-semibold w-full h-10 px-4"
                    name={name}
                    value={value || ""}
                    onChange={handleInputChange}
                  />
                  {name === "TCPassword" && (
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex pt-5 justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-green-800 text-white rounded-md"
              onClick={saveUserField}
            >
              Хадгалах
            </button>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Хүргэх хаяг</h2>
            <div className="pt-5">
              <button
                onClick={openAddressModal}
                type="button"
                className="px-4 py-2 bg-green-800 text-white rounded-md"
              >
                Хаяг нэмэх
              </button>
            </div>
            {userAddress?.length ? (
              userAddress.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl w-full p-5 my-5 bg-gray-100"
                >
                  <div className="text-lg font-semibold pb-3">
                    {locations.find(
                      (location) => location.id === item.TCCityLocation
                    )?.name || "Unknown"}
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
                    <button
                      type="button"
                      className="text-black mr-4"
                      onClick={() => addressRemove(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="text-black"
                      onClick={() => editAddress(item.id, true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600">No addresses available</div>
            )}
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        addressPk={addressPk}
        userPK={userInfo.id}
        map={"https://maps.app.goo.gl/3wNWTHeXgGDE8G3JA"}
        location={"1"}
        addName={"Ажил"}
      />
    </div>
  );
};

export default Profile;

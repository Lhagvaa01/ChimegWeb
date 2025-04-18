import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "antd";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { PiHeartBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const UserMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeCSS = "border-l-4 border-gray-400 bg-gray-200";
  const SignOut = () => {
    secureLocalStorage.removeItem("userInfo");
    navigate("/#");
    window.location.reload();
  };
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    // console.log(storedUserInfo ? JSON.parse(storedUserInfo) : {});
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });
  return (
    <div className="lg:w-1/4 w-full p-4 pr-5">
      <div className="grid w-full justify-center pb-2">
        {/* <Avatar
          className="w-32 h-32"
          src={
            <img
              src={
                "https://lh3.googleusercontent.com/a/ACg8ocJHxW50I48Q_7FcIs9zHSmgcQgnPbhmsKjXTID1MXKJt6qdVmw=s96-c"
              }
              alt="avatar"
            />
          }
        /> */}
        {userInfo && userInfo.TCImage != null ? (
          <Avatar
            src={<img src={userInfo && userInfo.TCImage} alt="avatar" />}
          />
        ) : (
          <FaUser className="w-32 h-32" size={25} color="green" />
        )}
      </div>
      <div className="flex items-center">
        <div className="w-2 h-8 bg-green-800 mr-4 rounded-md"></div>
        <h2 className="text-2xl font-bold">
          Сайна уу? {userInfo && userInfo.TCUserName}
        </h2>
      </div>
      <nav className="mt-8">
        <ul className="grid gap-2">
          <li className="rounded-md">
            <Link
              to="/OrderHistory"
              className={`flex items-center nav-menu-link text-gray-600 ${
                location.pathname === "/OrderHistory" ||
                location.pathname.match("OrderDetail")
                  ? activeCSS
                  : ""
              }`}
            >
              <span className="flex items-center justify-center w-8 h-8">
                <TbListDetails className="text-green-800" />
              </span>
              <span className="text-base font-semibold ml-2">
                Миний захиалгууд
              </span>
            </Link>
          </li>
          <li className="rounded-md">
            <Link
              to="/Wishlist"
              className={`flex items-center nav-menu-link text-gray-600 ${
                location.pathname === "/Wishlist" ||
                location.pathname === "/empty_Wishlist"
                  ? activeCSS
                  : ""
              }`}
            >
              <span className="flex items-center justify-center w-8 h-8">
                <PiHeartBold className="text-green-800" />
              </span>
              <span className="text-base font-semibold ml-2">
                Хүслийн жагсаалт
              </span>
            </Link>
          </li>
          <li className="rounded-md">
            <Link
              to="/Profile"
              className={`flex items-center nav-menu-link text-gray-600 ${
                location.pathname === "/Profile" ||
                location.pathname === "/Profile/add"
                  ? activeCSS
                  : ""
              }`}
            >
              <span className="flex items-center justify-center w-8 h-8">
                <FaRegUserCircle className="text-green-800" />
              </span>
              <span className="text-base font-semibold ml-2">
                Хувийн мэдээлэл
              </span>
            </Link>
          </li>
          <li className="rounded-md">
            <Link
              // to="/"
              className="flex items-center nav-menu-link text-gray-600"
              onClick={() => {
                SignOut();
              }}
            >
              <span className="flex items-center justify-center w-8 h-8">
                <BiLogOut className="text-green-800" />
              </span>
              <span className="text-base font-semibold ml-2">Гарах</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;

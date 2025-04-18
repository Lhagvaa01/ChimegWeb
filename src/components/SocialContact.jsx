import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";
import facebook from "../images/facebook.png";
import viber from "../images/viber.png";
import wechat from "../images/wechat.png";
import qrCode from "../images/qrCode.png";

const SocialContact = () => {
  const [isHoveredF, setIsHoveredF] = useState(false);
  const [isHoveredW, setIsHoveredW] = useState(false);
  const [isHoveredV, setIsHoveredV] = useState(false);
  const handleMouseEnter = (val) => {
    switch (val) {
      case "F":
        return setIsHoveredF(true);
      case "W":
        return setIsHoveredW(true);
      case "V":
        return setIsHoveredV(true);
    }
  };

  const handleMouseLeave = (val) => {
    switch (val) {
      case "F":
        return setIsHoveredF(false);
      case "W":
        return setIsHoveredW(false);
      case "V":
        return setIsHoveredV(false);
    }
  };
  return (
    <div className="fixed bottom-[10%] z-40 -mt-12 hidden flex-col items-center justify-center rounded  p-3 pt-3.5 text-sm font-semibold text-white shadow-900 right-0 lg:flex">
      <div className="">
        <a
          href="https://www.facebook.com/Kaccmn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800"
          onMouseEnter={() => handleMouseEnter("F")}
          onMouseLeave={() => handleMouseLeave("F")}
        >
          <div className="grid justify-center">
            <img
              className="w-[50px] h-[50px] ml-1 bg-indigo-800 rounded-lg"
              src={facebook}
            />
            <div className="grid justify-center text-indigo-800 ">Facebook</div>
          </div>
        </a>
        {isHoveredF && (
          <div className="fixed right-20 top-[56%]">
            <div className="grid justify-center items-center w-[150px] h-[150px] bg-white border-4 border-indigo-800 rounded-2xl">
              <div className="grid justify-center  text-black">Facebook</div>
              <img src={qrCode} alt="Social QR Code" />
            </div>
          </div>
        )}
      </div>

      <div className="my-3">
        <div
          className="text-gray-500 hover:text-gray-800"
          onMouseEnter={() => handleMouseEnter("W")}
          onMouseLeave={() => handleMouseLeave("W")}
        >
          <div className="">
            <img
              className="w-[50px] h-[50px] bg-white rounded-lg"
              src={wechat}
            />
            <div className="grid justify-center text-green-500">WeChat</div>
          </div>
        </div>
        {isHoveredW && (
          <div className="fixed right-20 top-[56%]">
            <div className="grid justify-center items-center w-[150px] h-[150px] bg-white border-4 border-green-500 rounded-2xl">
              <div className="grid justify-center text-black">WeChat</div>
              <img src={qrCode} alt="Social QR Code" />
            </div>
          </div>
        )}
      </div>
      <div className="">
        <div
          className="text-gray-500 hover:text-gray-800"
          onMouseEnter={() => handleMouseEnter("V")}
          onMouseLeave={() => handleMouseLeave("V")}
        >
          <div className="">
            <img
              className="w-[50px] h-[50px] bg-white rounded-lg"
              src={viber}
            />
            <div className="grid justify-center text-fuchsia-700">Viber</div>
          </div>
        </div>
        {isHoveredV && (
          <div className="fixed right-20 top-[56%]">
            <div className="grid justify-center items-center w-[150px] h-[150px] bg-white border-4 border-fuchsia-700 rounded-2xl">
              <div className="grid justify-center text-black">Viber</div>
              <img src={qrCode} alt="Social QR Code" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialContact;

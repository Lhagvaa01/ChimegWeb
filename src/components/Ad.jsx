import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const IntroAd = ({ adData }) => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Функц: Сурталчилгаа шалгах
    const checkAndShowAd = () => {
      const lastShownTime = secureLocalStorage.getItem("adLastShownTime");
      const currentTime = new Date().getTime(); // Одоогийн цаг (миллисекундээр)

      // 1 цаг = 60 минут * 60 секунд * 1000 миллисекунд
      const oneHour = 60 * 60 * 1000;

      // Хамгийн сүүлд харуулснаас 1 цаг өнгөрсөн эсэхийг шалгана
      if (!lastShownTime || currentTime - lastShownTime > oneHour) {
        setShowAd(true);
        secureLocalStorage.setItem("adLastShownTime", currentTime); // Одоогийн цагийг хадгална
      }
    };

    // Эхний шалгалт
    checkAndShowAd();

    // 1 цаг тутамд шалгах
    const intervalId = setInterval(() => {
      checkAndShowAd();
    }, 60 * 60 * 1000); // 1 цаг (миллисекундээр)

    // Component-ыг цэвэрлэх үед интервал зогсоох
    return () => clearInterval(intervalId);
  }, []);

  const closeAd = () => {
    setShowAd(false);
  };

  return (
    showAd && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[70%] md:w-[45%] max-w-full relative overflow-hidden">
          <img
            src={adData.image}
            alt="Ad Banner"
            loading="lazy"
            className="w-full h-40 sm:h-48 object-contain rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">
              {adData.title}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base mb-4 text-center">
              {adData.description}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeAd}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Хаах
              </button>
              <a
                href={adData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-800"
              >
                Дэлгэрэнгүй
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default IntroAd;

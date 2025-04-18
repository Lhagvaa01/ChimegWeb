import React from "react";
import snowflakeImage from "../images/snow.png";

const Snowfall = () => {
  return (
    <div className="snowfall-container fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {Array.from({ length: 100 }).map((_, index) => (
        <div
          key={index}
          className="snowflake absolute opacity-80"
          style={{
            width: `${Math.random() * 10 + 10}px`, // Цасан ширхэгийн өргөн
            height: `${Math.random() * 10 + 10}px`, // Цасан ширхэгийн өндөр
            top: `-${Math.random() * 100}px`, // Эхлэх байрлал
            left: `${Math.random() * 100}vw`, // Хэвтээ байрлал
            backgroundImage: `url(${snowflakeImage})`, // Зургийг фон болгон ашиглах
            backgroundSize: "cover", // Зургийн хэмжээг тохируулах
            animation: `fall ${Math.random() * 80 + 5}s linear infinite,  ${
              Math.random() * 5 + 2
            }s ease-in-out infinite`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Snowfall;

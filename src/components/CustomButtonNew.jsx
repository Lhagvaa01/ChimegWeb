import React from "react";

const ChristmasButton = ({ children, onClick }) => {
  return (
    <button
      // onClick={() => addProductToCart(product)}
      onClick={onClick}
      className="flex w-full items-center justify-center rounded bg-green-800 py-4 px-5 text-sm font-white text-white transition-colors duration-300 hover:bg-teal-600 lg:text-base"
    >
      <span>{children}</span>
    </button>
    // <button
    //   className="flex w-full items-center justify-center rounded bg-christmasRed hover:bg-christmasGreen text-white font-bold py-3 px-6 shadow-lg animate-glow"
    //   onClick={onClick}
    // >
    //   🎄 {children}
    // </button>
  );
};

export default ChristmasButton;

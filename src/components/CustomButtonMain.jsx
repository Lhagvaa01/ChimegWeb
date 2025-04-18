import React from "react";

const CustomButtonMain = ({ children, onClick, ismain }) => {
  return (
    <button
      onClick={onClick}
      id="add-btn"
      className={`group flex h-7 w-full items-center ${
        ismain ? "justify-between" : "justify-center"
      }  rounded bg-gray-100 text-xs text-body-dark transition-colors hover:border-green-800 hover:bg-green-800 hover:text-white focus:border-green-800 focus:bg-green-800 focus:text-white focus:outline-0 md:h-9 md:text-sm`}
      // className={`group flex h-7 w-full items-center ${
      //   ismain ? "justify-between" : "justify-center"
      // } rounded text-xs text-body-dark transition-colors hover:border-green-800 hover:text-white focus:border-green-800 focus:bg-green-800 focus:text-white focus:outline-0 md:h-9 md:text-sm bg-christmasRed hover:bg-green-800 text-white shadow-lg animate-glow`}
    >
      <span className={`flex gap-2 ${ismain ? "pl-2" : "pl-0"}`}>
        <div>{children}</div>
      </span>
      {ismain ? (
        <span className="grid h-7 w-7 place-items-center bg-green-800 transition-colors duration-200 group-hover:bg-green-700 group-focus:bg-green-700 ltr:rounded-tr ltr:rounded-br rtl:rounded-tl rtl:rounded-bl md:h-9 md:w-9">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4 stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </span>
      ) : null}
    </button>
  );
};

export default CustomButtonMain;

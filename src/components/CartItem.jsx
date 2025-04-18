import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import NumberFormatExample from "../constant/NumberFormatExample";

const CartItem = ({ item, onQuantityChange, remove }) => {
  return (
    <div className="flex items-center border-t border-solid border-opacity-75 px-4 py-4 text-sm sm:px-6">
      <div className="flex-shrink-0">
        <div className="flex overflow-hidden flex-col-reverse items-center w-8 h-24 bg-gray-100  rounded-full">
          <div className="cursor-pointer p-2 transition-colors duration-200 hover:bg-accent-hover focus:outline-0 hover:!bg-gray-100">
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => onQuantityChange(item.itemCode, false)}
            >
              <BiMinus className="text-black" />
            </motion.div>
          </div>
          <div className="flex flex-1 items-center justify-center px-3 text-sm font-semibold  ">
            {item.count}
          </div>
          <div className="cursor-pointer p-2 transition-colors duration-200 hover:bg-accent-hover focus:outline-0 hover:!bg-gray-100">
            <motion.div
              whileTap={{ scale: 0.75 }}
              // onClick={() => updateQty("add", item?.id)}
              onClick={() => onQuantityChange(item.itemCode, true)}
            >
              <BiPlus className="text-black " />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="relative mx-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-gray-100 sm:h-16 sm:w-16">
        <img
          alt="Apples"
          loading="lazy"
          decoding="async"
          data-nimg="fill"
          className="object-contain"
          sizes="(max-width: 768px) 100vw"
          src={item.imgs[0]}
        />
      </div>
      <div>
        <h3 className="font-bold "> {item.name}</h3>
        <p className="flex mt-2.5 font-semibold text-accent">
          {item.discountPrice === 0
            ? NumberFormatExample(item.price)
            : NumberFormatExample(item.discountPrice)}
          ₮
        </p>
      </div>
      <span className="flex font-bold ml-auto mr-5">
        {item.discountPrice === 0
          ? NumberFormatExample(parseFloat(item?.price) * item?.count)
          : NumberFormatExample(parseFloat(item?.discountPrice) * item?.count)}
        ₮{/* {NumberFormatExample(parseFloat(item?.price) * item?.count)}₮ */}
      </span>
      <button
        onClick={() => remove(item)}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600 focus:outline-0 ltr:ml-3 ltr:-mr-2 rtl:mr-3 rtl:-ml-2"
      >
        <span className="sr-only">close</span>
        <svg
          className="h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    // <div className="w-full p-1 px-2 rounded-lg bg-zinc-800 flex items-center gap-2">
    //   <img
    //     src={item?.img}
    //     className="w-20 h-20 max-w-[60px] rounded-full object-contain"
    //     alt=""
    //   />

    //   {/* name section */}
    //   <div className="flex flex-col gap-2">
    //     <p className="text-base text-gray-50">{item?.title}</p>
    //     <p className="text-sm block text-gray-300 font-semibold">
    //       $ {parseFloat(item?.price) * qty}
    //     </p>
    //   </div>

    //   {/* button section */}
    //   <div className="group flex items-center gap-2 ml-auto cursor-pointer">
    //     <motion.div
    //       whileTap={{ scale: 0.75 }}
    //       onClick={() => updateQty("remove", item?.id)}
    //     >
    //       <BiMinus className="text-gray-50 " />
    //     </motion.div>

    //     <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
    //       {qty}
    //     </p>

    //     <motion.div
    //       whileTap={{ scale: 0.75 }}
    //       onClick={() => updateQty("add", item?.id)}
    //     >
    //       <BiPlus className="text-gray-50 " />
    //     </motion.div>
    //   </div>
    // </div>
  );
};

export default CartItem;

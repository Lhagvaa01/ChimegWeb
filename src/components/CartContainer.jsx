import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import CartItem from "./CartItem";
import NumberFormatExample from "../constant/NumberFormatExample";
import { Link } from "react-router-dom";

const CartContainer = ({
  visibilty,
  onClose,
  products,
  onProductRemove,
  onProductClear,
  onQuantityChange,
  tot,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-4/12 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => onClose(!visibilty)}
        >
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Сагс</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={onProductClear}
        >
          Сагс хоослох <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {products && products.length > 0 ? (
        <div className="">
          {/* cart Items section */}
          <div className="">
            {/* cart Item */}
            {products &&
              products.length > 0 &&
              products.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={onQuantityChange}
                  remove={onProductRemove}
                />
              ))}
          </div>

          {/* cart total section */}
          <footer className="fixed bottom-0 z-10 w-full max-w-md bg-white px-6 py-5">
            <Link to={"/PayOut"} onClick={() => onClose(!visibilty)}>
              <button className="flex h-12 w-full justify-between rounded-full bg-green-800 p-1 text-sm font-bold shadow-700 transition-colors hover:bg-accent-hover focus:bg-accent-hover focus:outline-0 md:h-14">
                <span className="flex h-full flex-1 items-center px-5 text-white">
                  Төлбөр төлөх
                </span>
                <span className="flex h-full shrink-0 items-center rounded-full bg-white px-5 text-emerald-600">
                  {NumberFormatExample(tot)}₮
                </span>
              </button>
            </Link>
          </footer>
          {/* <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ${tot + 2.5}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div> */}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          {/* <img src={EmptyCart} className="w-300" alt="" /> */}
          <p className="text-xl text-textColor font-semibold">
            Бараа сагслаагүй байна!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;

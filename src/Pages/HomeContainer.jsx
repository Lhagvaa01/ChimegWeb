import React, { useEffect, useRef, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import CartContainer from "../components/CartContainer";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import CartItem from "../components/CartItem";
import { CartContext } from "../CartContext";
import Category from "../components/Category";

const HomeContainer = ({ dBgroup }) => {
  return (
    <div className="grid bg-white" id="home">
      <Category dBgroup={dBgroup} />
    </div>
  );
};

export default HomeContainer;

import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemsMain, setCartItemsMain] = useState([]);

  return (
    <CartContext.Provider value={{ cartItemsMain, setCartItemsMain }}>
      {children}
    </CartContext.Provider>
  );
};

// context/StateProvider.js
import React, { createContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children, initialState, reducer }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

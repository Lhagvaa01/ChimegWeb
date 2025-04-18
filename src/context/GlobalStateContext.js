// import React, { createContext, useContext, useState } from 'react';

// const GlobalStateContext = createContext();

// export const GlobalStateProvider = ({ children }) => {
//   const [gGroup, setGGroup] = useState([]);

//   // Function to update gGroup with a new array
//   const updateGGroup = (newArray) => {
//     setGGroup(newArray);
//     console.log("gGroup update: ");
//     console.log(newArray);
//   };

//   return (
//     <GlobalStateContext.Provider value={{ gGroup, updateGGroup }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// export const useGlobalState = () => {
//   return useContext(GlobalStateContext);
// };

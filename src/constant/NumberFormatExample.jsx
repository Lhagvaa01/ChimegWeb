import React from "react";

const NumberFormatExample = (number) => {
  const formattedNumber = number ? number.toLocaleString() : "";

  return <div>{formattedNumber}</div>;
};

export default NumberFormatExample;

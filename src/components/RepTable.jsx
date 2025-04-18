import React, { useState } from "react";
import NumberFormatExample from "../constant/NumberFormatExample";

export default function Table({ products, tot }) {
  const [counter, setCounter] = useState(0);
  const subTotal = (price, count) => {
    return NumberFormatExample(price * count);
  };
  return (
    <>
      <table width="100%" className="">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">№</td>
            <td className="font-bold">Дотоод код</td>
            <td className="font-bold">Барааны нэр</td>
            <td className="font-bold">Тоо/ш</td>
            <td className="font-bold">Нэгжийн Үнэ</td>
            <td className="font-bold">Нийт Үнэ</td>
          </tr>
        </thead>
        {products.map(
          ({ itemCode, name, count, price, discountPrice }, index) => (
            <React.Fragment key={itemCode}>
              <tbody>
                <tr className="h-10 border-b">
                  <td>{counter + index + 1}</td>
                  <td>{itemCode}</td>
                  <td>{name}</td>
                  <td>{count}</td>
                  <td>
                    {discountPrice === 0
                      ? NumberFormatExample(price)
                      : NumberFormatExample(discountPrice)}
                  </td>
                  <td>
                    {discountPrice === 0
                      ? subTotal(price, count)
                      : subTotal(discountPrice, count)}
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>
    </>
  );
}

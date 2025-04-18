import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
// import { State } from "../context/stateContext";

export default function MainDetails() {
  const [orderNum, setOrderNum] = useState(() => {
    const orderNum = secureLocalStorage.getItem("orderNum");
    return orderNum ? JSON.parse(orderNum) : null;
  });
  return (
    <>
      <section className="flex items-center justify-center">
        <div className="font-bold text-2xl uppercase mb-1 mr-5">
          НЭХЭМЖЛЭЛ №:
        </div>
        <div className="font-bold text-2xl uppercase mb-1">{orderNum}</div>
      </section>
    </>
  );
}

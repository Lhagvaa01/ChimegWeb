import React, { useState, useEffect } from "react";
import axios from "axios";
import { successToast, errorToast } from "../../constant/ReacrToast";
import secureLocalStorage from "react-secure-storage";

const PayCheck = ({ TCOrderNumber }) => {
  const [res, setRes] = useState(null);
  const [orderNum, setOrderNum] = useState(() => {
    const orderNum = secureLocalStorage.getItem("orderNum");
    return orderNum ? JSON.parse(orderNum) : null;
  });

  const GetPay = async () => {
    const token = "token 218d68b6dfe280a288a396352f7d720a18a00997";
    const axiosInstance = axios.create({
      headers: {
        Authorization: `${token}`,
      },
    });

    try {
      const response = await axiosInstance.get(
        `https://${APIURL}/post_UserHistory/${orderNum}/1859000/`
      );
      setRes(response.data.dtl);
      // console.log(response.data.dtl);
    } catch (error) {
      console.error("Error fetching data:", error);
      errorToast("Failed to fetch product data.");
    }
  };

  useEffect(() => {
    if (orderNum) {
      fetchProductById();
    }
  }, [orderNum]);

  useEffect(() => {
    if (res) {
      successToast(
        `Амжилттай: ${orderNum} дугаартай захиалга амжилттай захиалагдлаа`
      );
    }
  }, [res, orderNum]);

  return <div>{/* You can render product information here if needed */}</div>;
};

export default PayCheck;

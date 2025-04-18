import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const QuickViewModal = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyRegister, setCompanyRegister] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyMail, setCompanyMail] = useState("");

  const handleInputChangeRd = (event) => {
    setCompanyRegister(event.target.value);
  };
  const handleInputChangePhone = (event) => {
    setCompanyPhone(event.target.value);
  };
  const handleInputChangeMail = (event) => {
    setCompanyMail(event.target.value);
  };

  const searchCompanyName = () => {
    fetchData();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchCompanyName();
    }
  };

  useEffect(() => {
    // console.log(companyName);
  }, [companyName]);

  // const fetchData = async () => {
  //   try {
  //     setLoading(true); // Set loading state to true when fetching data
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/getShopCustomers/`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const jsonData = await response.json();
  //     setCompanyName(jsonData.name);
  //     setLoading(false); // Set loading state back to false after data is fetched
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false); // Set loading state back to false in case of error
  //   }
  // };

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true when fetching data
      const response = await fetch(
        `http://new.kacc.mn:8087/proxy?url=http://info.ebarimt.mn/rest/merchant/info?regno=${companyRegister}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setCompanyName(jsonData.name);
      setLoading(false); // Set loading state back to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading state back to false in case of error
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Quick View Modal"
      className="absolute border top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-64 md:w-1/3 bg-white rounded-lg shadow-lg"
    >
      <div className="grid grid-cols-1 p-8">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Компаний регистер"
            className="border mb-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={handleInputChangeRd}
            onKeyDown={handleKeyPress}
          />
          <button
            type="button"
            className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-10 mx-3"
            onClick={searchCompanyName}
            disabled={loading}
          >
            {loading ? "Түр хүлээнэ үү..." : "Хайх"}
          </button>
          <div className="border mb-2 border-gray-300 rounded-md px-4 py-2 w-full">
            {companyName}
          </div>
        </div>
        <input
          type="text"
          placeholder="Утасны дугаар"
          className="border mb-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleInputChangePhone}
        />
        <input
          type="text"
          placeholder="Э-МЭЙЛ хаяг"
          className="border mb-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleInputChangeMail}
        />
        <button
          className="bg-green-800 mt-2 hover:bg-green-700 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
          onClick={(e) =>
            onClose(e, companyName, companyRegister, companyPhone, companyMail)
          }
        >
          Үргэлжлүүлэх
        </button>
      </div>
    </Modal>
  );
};

export default QuickViewModal;

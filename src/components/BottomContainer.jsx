import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { AiOutlineSearch, AiFillHome } from "react-icons/ai";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const BottomContainer = () => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    // console.log(JSON.parse(storedUserInfo));
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle form submission to navigate to the search results page
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsModalOpen(false); // Close modal after search
    } else {
      alert("Please enter a search term.");
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="visible h-12 md:h-14 lg:hidden ">
      <nav className="fixed bottom-0 z-10 flex justify-between w-full h-14 px-5 bg-slate-100 shadow-400 md:h-14">
        {/* Home Link */}
        <a
          href="/"
          className="flex w-1/3 flex-col items-center justify-center h-full p-2 focus:text-accent focus:outline-none"
          tabindex="0"
        >
          <AiFillHome className="fill-green-800" size={25} />
          <span className="text-sm">Нүүр</span>
        </a>

        {/* Search Button */}
        <a
          className="flex w-1/3 flex-col items-center justify-center h-full p-2 focus:text-accent focus:outline-none"
          tabindex="0"
          onClick={toggleModal}
        >
          <AiOutlineSearch className="fill-green-800" size={30} />
          <span className="text-sm">Хайх</span>
        </a>

        {/* Profile/Login Link */}
        <a
          href={userInfo != null ? "/Profile" : "/LoginPage"}
          className="flex w-1/3 flex-col items-center justify-center h-full p-2 focus:text-accent focus:outline-none"
          tabindex="0"
        >
          <FaUser className="fill-green-800" size={25} />
          <span className="text-sm">
            {userInfo != null ? userInfo.TCUserName : "Нэвтрэх"}
          </span>
        </a>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-md">
            <div className="text-right">
              <button onClick={toggleModal} className="text-gray-600">
                X {/* Close button */}
              </button>
            </div>
            <div>Хайх утгаа бичнэ үү!</div>
            <div className="flex justify-center items-center my-5">
              <form onSubmit={handleSearchSubmit} className="flex w-full">
                {/* Search Input Field */}
                <input
                  type="text"
                  placeholder="Хайх барааны нэрийг бичнэ үү..."
                  className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-green-800 text-white p-2 rounded-r-md hover:bg-green-700 transition"
                >
                  Хайх
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomContainer;

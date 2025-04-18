import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle form submission to navigate to the search results page
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log("Search Submitted: ", searchQuery);

    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsModalOpen(false); // Close modal after search
    } else {
      alert("Please enter a search term.");
    }
  };

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="mt-44">
      {/* Button to trigger the modal */}
      <button
        onClick={toggleModal}
        className="bg-green-800 text-white p-2 rounded-md hover:bg-green-700 transition"
      >
        Хайх
      </button>

      {/* Modal */}
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

export default SearchBar;

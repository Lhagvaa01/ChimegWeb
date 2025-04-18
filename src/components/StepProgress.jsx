import React, { useState, useEffect } from "react";

const StepProgress = ({ index = 0 }) => {
  const steps = [
    { label: "Захиалга батлах" },
    { label: "Хаягийн мэдээлэл" },
    { label: "Төлбөрийн хэлбэр" },
    { label: "Төлбөр төлөх" },
  ];

  // Initialize with the stored time if available, otherwise set to 600 seconds (10 minutes)
  const initialTime = parseInt(localStorage.getItem("timeLeft")) || 600;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Only run the timer if we're on the last step and there's time left
    if (index === steps.length - 1 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("timeLeft", newTime); // Update localStorage with new time
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer); // Clear timer on unmount
    } else if (timeLeft <= 0) {
      localStorage.removeItem("timeLeft"); // Remove time when timer reaches zero
    }
  }, [index, timeLeft]);

  // Function to format time in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center mb-8 mt-28 md:mt-10 px-4 lg:px-10">
      <div className="flex items-center w-full max-w-4xl space-x-4 md:space-x-6 lg:space-x-8">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {/* Line before each step except the first one */}
            {i > 0 && (
              <div
                className={`flex-grow border-t ${
                  i <= index ? "border-green-800" : "border-gray-300"
                }`}
              />
            )}

            {/* Step with countdown on the last step */}
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                  i <= index ? "bg-green-800" : "bg-gray-300"
                }`}
              >
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 ${
                    i <= index ? "text-white" : "text-gray-500"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="mt-2 text-xs md:text-sm lg:text-base text-gray-700">
                {step.label}
              </span>
              {/* Display timer for the last step */}
              {i === steps.length - 1 && index === i && timeLeft > 0 && (
                <span className="text-xs md:text-sm lg:text-base text-red-600 mt-1">
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;

import React from "react";

const TailwindButton = ({ color, size, className, children, ...props }) => {
  // Define color classes based on the prop
  const colors = {
    green: "bg-green-800 text-white hover:bg-green-700",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    red: "bg-red-600 text-white hover:bg-red-700",
  };

  // Define size classes based on the prop
  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-5 text-lg",
  };

  // Determine color and size classes based on the props
  const colorClass = colors[color] || colors.green; // Default to green if no color is provided
  const sizeClass = sizes[size] || sizes.md; // Default to medium size

  return (
    <button
      className={`${colorClass} ${sizeClass} rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${className} hover:scale-105`} // Adding hover scale and transition effects
      {...props} // Pass additional props like onClick, type, etc.
    >
      {children}
    </button>
  );
};

export default TailwindButton;

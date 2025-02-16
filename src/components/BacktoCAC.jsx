import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importing hooks

const BackToCACButton = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (path)

  // Hide the button on the home page
  if (location.pathname === "/") {
    return null;
  }

  const handleClick = () => {
    navigate("/"); // Navigate to the home page (Back to CAC)
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 p-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
      style={{
        zIndex: 9999,
        fontSize: "16px",
      }}
    >
      ← CAC
    </button>
  );
};

export default BackToCACButton;

import React, { useState } from "react";

const UserHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left Section: Welcome Message */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">CAC</h2>
        <p className="text-gray-500 text-sm">Welcome to User dashboard</p>
      </div>

      {/* Right Section: Search Bar and Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hidden sm:block"
        />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              A
            </div>
            <span className="hidden sm:block text-gray-800 font-medium">
              Alex
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
              <ul>
                <li className="border-b">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => alert("Navigating to Profile")}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => alert("Logging out...")}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;

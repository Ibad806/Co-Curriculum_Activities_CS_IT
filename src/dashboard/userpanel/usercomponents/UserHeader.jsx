import React from "react";
import { AiOutlineBell } from "react-icons/ai"; // For the notification icon
import h from "../../../assets/smec_banner.png"


const UserHeader = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10 ml-64">
      {/* Left Section: Dashboard Title */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu Icon */}
        <button className="text-gray-700 text-2xl">
          <span className="material-icons"></span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-grow mx-8">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Right Section: Notifications and Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative">
          <AiOutlineBell className="text-2xl text-gray-700 cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            src={h}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-800 font-medium">Rameez</p>
            <p className="text-gray-500 text-sm">User</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;

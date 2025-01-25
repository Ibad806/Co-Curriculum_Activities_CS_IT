import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10 ml-64">
      {/* Left Section: Dashboard Title */}
      <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>

      {/* Right Section: Notifications and Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative">
          <AiOutlineBell className="text-2xl text-gray-700 cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            5
          </span>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FaUserShield className="text-xl text-gray-700" />
          </div>
          <div>
            <p className="text-gray-800 font-medium">Admin</p>
            <p className="text-gray-500 text-sm">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

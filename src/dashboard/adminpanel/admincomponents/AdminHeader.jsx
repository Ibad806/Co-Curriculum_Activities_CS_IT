import React, { useState } from "react";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import h from "../../../assets/smec_banner.png";

const AdminHeader = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-stretch md:items-center sticky top-0 z-30 md:ml-64">
      {/* Left Section */}
      <div className="flex items-center justify-between md:justify-start mb-4 md:mb-0">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="md:hidden ml-4 text-gray-600"
        >
          <AiOutlineSearch className="text-2xl" />
        </button>
      </div>

      {/* Search Bar */}
      <div className={`${showMobileSearch ? 'flex' : 'hidden'} md:flex flex-grow mx-0 md:mx-8 mb-4 md:mb-0`}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <AiOutlineSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search admin panel..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-end space-x-4">
        <div className="relative">
          <AiOutlineBell className="text-2xl text-gray-700 cursor-pointer hover:text-indigo-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <img
            src={h}
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
          />
          <div className="hidden md:block">
            <p className="text-gray-800 font-medium">System Admin</p>
            <p className="text-gray-500 text-sm">Super Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
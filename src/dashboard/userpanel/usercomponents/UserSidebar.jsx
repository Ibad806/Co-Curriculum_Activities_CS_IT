import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaTicketAlt, FaBell } from "react-icons/fa";

const UserSidebar = () => {
  const location = useLocation();

  // Function to determine active style
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white overflow-y-auto shadow-md h-screen w-16 lg:w-64 flex flex-col items-center lg:items-start py-4">
      {/* Sidebar Header */}
      <div className="hidden lg:block mb-6 pl-4">
        <h1 className="text-xl font-bold text-gray-800">User Panel</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col items-center lg:items-start space-y-2 w-full">
        {/* Home */}
        <NavLink
          to="/userpanel"
          className={`flex flex-col items-center lg:flex-row lg:items-center lg:justify-start p-3 w-full rounded-lg ${
            isActive("/userpanel")
              ? "bg-blue-100 text-blue-500"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FaHome
            className={`text-2xl ${
              isActive("/userpanel") ? "text-blue-500" : "text-gray-600"
            }`}
          />
          <span
            className={`text-xs lg:text-base lg:ml-4 ${
              isActive("/userpanel") ? "text-blue-500" : "text-gray-600"
            }`}
          >
            Home
          </span>
        </NavLink>

        {/* Tickets */}
        <NavLink
          to="/userpanel/ticket"
          className={`flex flex-col items-center lg:flex-row lg:items-center lg:justify-start p-3 w-full rounded-lg ${
            isActive("/userpanel/ticket")
              ? "bg-blue-100 text-blue-500"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FaTicketAlt
            className={`text-2xl ${
              isActive("/userpanel/ticket") ? "text-blue-500" : "text-gray-600"
            }`}
          />
          <span
            className={`text-xs lg:text-base lg:ml-4 ${
              isActive("/userpanel/ticket") ? "text-blue-500" : "text-gray-600"
            }`}
          >
            Tickets
          </span>
        </NavLink>

        {/* Notifications */}
        <NavLink
          to="/userpanel/notifications"
          className={`flex flex-col items-center lg:flex-row lg:items-center lg:justify-start p-3 w-full rounded-lg ${
            isActive("/userpanel/notifications")
              ? "bg-blue-100 text-blue-500"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FaBell
            className={`text-2xl ${
              isActive("/userpanel/notifications")
                ? "text-blue-500"
                : "text-gray-600"
            }`}
          />
          <span
            className={`text-xs lg:text-base lg:ml-4 ${
              isActive("/userpanel/notifications")
                ? "text-blue-500"
                : "text-gray-600"
            }`}
          >
            Notifications
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default UserSidebar;

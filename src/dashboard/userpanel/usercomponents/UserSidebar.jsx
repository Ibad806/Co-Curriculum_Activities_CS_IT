import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaCog,
  FaUser,
  FaBars,
  FaTrophy,
  FaUserTie,
} from "react-icons/fa";
import h from "../../../assets/smec_banner.png";

const UserSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Sidebar for Large Screens */}
      <div className="hidden md:flex bg-[#0B0D2C] text-white h-screen w-64 fixed top-0 left-0 flex-col">
        {/* Profile Section */}
        <div className="p-6 flex flex-col items-center border-b border-indigo-700">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            {/* Replace with dynamic profile image */}
            <img
              src={h}
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-3">Rameez Rafiq</h2>
          <p className="text-sm text-gray-300">rameez123@gmail.com</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1">
          <NavLink
            to="/userpanel/home"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaHome className="mr-3 text-lg" />
            Home
          </NavLink>
          <NavLink
            to="/userpanel/ticket"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaTicketAlt className="mr-3 text-lg" />
            Tickets
          </NavLink>
          <NavLink
            to="/userpanel/winners"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaTrophy className="mr-3 text-lg" /> {/* Updated icon */}
            Winners
          </NavLink>

          <NavLink
            to="/userpanel/applyforposts"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaUserTie className="mr-3 text-lg" />
            Apply for Posts
          </NavLink>

          <NavLink
            to="/userpanel/profile"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaUser className="mr-3 text-lg" />
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Sidebar for Small Screens */}
      <div
        className={`md:hidden bg-[#0B0D2C] text-white h-screen ${
          isExpanded ? "w-64" : "w-16"
        } fixed top-0 left-0 flex flex-col items-center transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl p-2 mt-4 focus:outline-none"
        >
          <FaBars />
        </button>

        {/* Navigation */}
        <nav className="mt-6 flex-1 flex flex-col space-y-4 items-center">
          <NavLink
            to="/userpanel/home"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive
                  ? "text-indigo-500"
                  : "text-white hover:text-indigo-500"
              }`
            }
          >
            <FaHome className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Home</span>}
          </NavLink>
          <NavLink
            to="/userpanel/ticket"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive
                  ? "text-indigo-500"
                  : "text-white hover:text-indigo-500"
              }`
            }
          >
            <FaTicketAlt className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Tickets</span>}
          </NavLink>
          <NavLink
            to="/userpanel/winners"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive
                  ? "text-indigo-500"
                  : "text-white hover:text-indigo-500"
              }`
            }
          >
            <FaCog className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Winners</span>}
          </NavLink>
          <NavLink
            to="/userpanel/profile"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive
                  ? "text-indigo-500"
                  : "text-white hover:text-indigo-500"
              }`
            }
          >
            <FaUser className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Profile</span>}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default UserSidebar;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTrophy, FaClipboard, FaTable, FaUser, FaBars } from "react-icons/fa";
import h from "../../../assets/smec_banner.png";

const JudgesSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Sidebar for Large Screens */}
      <div className="hidden md:flex bg-[#0B0D2C] text-white h-screen w-64 fixed top-0 left-0 flex-col">
        <div className="p-6 flex flex-col items-center border-b border-indigo-700">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <img src={h} alt="Profile" className="rounded-full w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-semibold mt-3">Judge Ibad</h2>
          <p className="text-sm text-gray-300">judge123@gmail.com</p>
        </div>
        <nav className="mt-6 flex-1">
          <NavLink to="/judgespanel/home" className="flex items-center p-4 text-base font-medium hover:bg-indigo-700">
            <FaHome className="mr-3 text-lg" />
            Dashboard
          </NavLink>
          <NavLink to="/judgespanel/tournaments" className="flex items-center p-4 text-base font-medium hover:bg-indigo-700">
            <FaTrophy className="mr-3 text-lg" />
            Tournaments
          </NavLink>
            <NavLink to="/judgespanel/matches" className="flex items-center p-4 text-base font-medium hover:bg-indigo-700">
              <FaClipboard className="mr-3 text-lg" />
              Matches
            </NavLink>
          <NavLink to="/judgespanel/scoreboard" className="flex items-center p-4 text-base font-medium hover:bg-indigo-700">
            <FaTable className="mr-3 text-lg" />
            Scoreboard
          </NavLink>
          <NavLink to="/judgespanel/profile" className="flex items-center p-4 text-base font-medium hover:bg-indigo-700">
            <FaUser className="mr-3 text-lg" />
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Sidebar for Small Screens */}
      <div className={`md:hidden bg-[#0B0D2C] text-white h-screen ${isExpanded ? "w-64" : "w-16"} fixed top-0 left-0 flex flex-col items-center transition-all duration-300`}>
        <button onClick={toggleSidebar} className="text-white text-2xl p-2 mt-4">
          <FaBars />
        </button>
        <nav className="mt-6 flex-1 flex flex-col space-y-4 items-center">
          <NavLink to="/judgespanel/dashboard" className="flex flex-col items-center hover:text-indigo-500">
            <FaHome className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Dashboard</span>}
          </NavLink>
          <NavLink to="/judgespanel/tournaments" className="flex flex-col items-center hover:text-indigo-500">
            <FaTrophy className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Tournaments</span>}
          </NavLink>
          <NavLink to="/judgespanel/matches" className="flex flex-col items-center hover:text-indigo-500">
            <FaClipboard className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Matches</span>}
          </NavLink>
          <NavLink to="/judgespanel/scoreboard" className="flex flex-col items-center hover:text-indigo-500">
            <FaTable className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Scoreboard</span>}
          </NavLink>
          <NavLink to="/judgespanel/profile" className="flex flex-col items-center hover:text-indigo-500">
            <FaUser className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Profile</span>}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default JudgesSidebar;

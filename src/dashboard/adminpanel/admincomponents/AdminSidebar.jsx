import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaGamepad, FaClipboardList, FaCog, FaBell, FaFileAlt, FaCaretDown } from "react-icons/fa";

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isJudgesMenuOpen, setIsJudgesMenuOpen] = useState(false);
  const [isGamesMenuOpen, setIsGamesMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleJudgesMenu = () => {
    setIsJudgesMenuOpen(!isJudgesMenuOpen);
  };

  const toggleGamesMenu = () => {
    setIsGamesMenuOpen(!isGamesMenuOpen);
  };

  return (
    <>
      {/* Sidebar for Large Screens */}
      <div className="overflow-y-auto md:flex bg-[#0B0D2C] text-white h-screen w-64 fixed top-0 left-0 flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-indigo-700">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 flex-1">
          <NavLink
            to="/adminpanel/home"
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
            to="/adminpanel/users"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaUsers className="mr-3 text-lg" />
            User Management
          </NavLink>
          
          {/* Judges Management Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={toggleJudgesMenu}
              className="flex items-center p-4 text-base font-medium justify-between w-full hover:bg-indigo-700"
            >
              <span className="flex items-center">
                <FaGamepad className="mr-3 text-lg" />
                Judges Management
              </span>
              <FaCaretDown className={`${isJudgesMenuOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isJudgesMenuOpen && (
              <div className="flex flex-col">
                <NavLink
                  to="/adminpanel/judges/create"
                  className={({ isActive }) =>
                    `ml-6 p-4 text-sm font-medium ${
                      isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
                    }`
                  }
                >
                  Create Judge
                </NavLink>
                <NavLink
                  to="/adminpanel/judges/assign"
                  className={({ isActive }) =>
                    `ml-6 p-4 text-sm font-medium ${
                      isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
                    }`
                  }
                >
                  Assign Tournaments
                </NavLink>
                <NavLink
                  to="/adminpanel/judges/list"
                  className={({ isActive }) =>
                    `ml-6 p-4 text-sm font-medium ${
                      isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
                    }`
                  }
                >
                  Judges List
                </NavLink>
              </div>
            )}
          </div>

          {/* Games Management Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={toggleGamesMenu}
              className="flex items-center p-4 text-base font-medium justify-between w-full hover:bg-indigo-700"
            >
              <span className="flex items-center">
                <FaGamepad className="mr-3 text-lg" />
                Games Management
              </span>
              <FaCaretDown className={`${isGamesMenuOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isGamesMenuOpen && (
              <div className="flex flex-col">
                <NavLink
                  to="/adminpanel/games/list"
                  className={({ isActive }) =>
                    `ml-6 p-4 text-sm font-medium ${
                      isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
                    }`
                  }
                >
                  Game List
                </NavLink>
                <NavLink
                  to="/adminpanel/games/add"
                  className={({ isActive }) =>
                    `ml-6 p-4 text-sm font-medium ${
                      isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
                    }`
                  }
                >
                  Add Game
                </NavLink>
                <NavLink
                  to="/adminpanel/games/edit"
                  className={({ isActive }) =>
                    `ml-6 p-4 text-sm font-medium ${
                      isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
                    }`
                  }
                >
                  Edit/Delete Game
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/adminpanel/posts"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaFileAlt className="mr-3 text-lg" />
            Post Applications
          </NavLink>
          <NavLink
            to="/adminpanel/settings"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaCog className="mr-3 text-lg" />
            Ticket Management
          </NavLink>
          <NavLink
            to="/adminpanel/announcements"
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
              }`
            }
          >
            <FaCog className="mr-3 text-lg" />
            Announcements
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
          ☰
        </button>

        {/* Navigation Links */}
        <nav className="mt-6 flex-1 flex flex-col space-y-4 items-center">
          <NavLink
            to="/adminpanel/home"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-indigo-500" : "text-white hover:text-indigo-500"
              }`
            }
          >
            <FaHome className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Home</span>}
          </NavLink>
          <NavLink
            to="/adminpanel/users"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-indigo-500" : "text-white hover:text-indigo-500"
              }`
            }
          >
            <FaUsers className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Users</span>}
          </NavLink>
          <NavLink
            to="/adminpanel/games"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-indigo-500" : "text-white hover:text-indigo-500"
              }`
            }
          >
            <FaGamepad className="text-xl" />
            {isExpanded && <span className="mt-1 text-sm">Games</span>}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;

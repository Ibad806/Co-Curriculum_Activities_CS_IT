import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaProjectDiagram,
  FaTicketAlt,
  FaImage,
  FaCalendarCheck,
  FaCog,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes
} from "react-icons/fa";
import h from "../../../assets/smec_banner.png";

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);

  const adminMenu = [
    { 
      title: "Dashboard", 
      icon: <FaHome className="md:mr-3 text-lg" />, 
      path: "/Adminpanel/home" 
    },
    {
      title: "Event Management",
      icon: <FaCalendarAlt className="md:mr-3 text-lg" />,
      submenu: [
        { title: "Add New Event", path: "/adminpanel/addnewevent" },
        { title: "Manage Events", path: "/adminpanel/manageevents" },
        // { title: "Calendar View", path: "/admin/calendar" },
        // { title: "Event Resources", path: "/admin/resources" },
        // { title: "Event Reports", path: "/admin/reports" }
      ]
    },
    {
      title: "SMEC Management",
      icon: <FaProjectDiagram className="md:mr-3 text-lg" />,
        submenu: [
          { title: "Create Game", path: "/adminpanel/creategame" },
          { title: "Manage Game", path: "/adminpanel/managegame" },
          { title: "Judges Panel", path: "/adminpanel/judgesmanagement" },
          { title: "Post Applications", path: "/adminpanel/postapplication" },
          { title: "Ticketing", path: "/adminpanel/ticketmanagement" },
          { title: "Announcements", path: "/adminpanel/announcements" }
        ]
    },
    // {
    //   title: "Qawali Night",
    //   icon: <FaTicketAlt className="md:mr-3 text-lg" />,
    //   submenu: [
    //     { title: "Ticketing", path: "/admin/qawali/tickets" },
    //     { title: "Seating", path: "/admin/qawali/seating" },
    //     { title: "Logistics", path: "/admin/qawali/logistics" },
    //     { title: "Guest List", path: "/admin/qawali/guests" }
    //   ]
    // },
    {
      title: "CAC",
      icon: <FaImage className="md:mr-3 text-lg" />,
      submenu: [
        { title: "Gallery", path: "/adminpanel/gallerymanagement" },
        { title: "News", path: "/adminpanel/news" },
        // { title: "Moderate", path: "/admin/gallery/moderate" }
      ]
    },
    // {
    //   title: "Dynamic Events",
    //   icon: <FaCalendarCheck className="md:mr-3 text-lg" />,
    //   submenu: [
    //     { title: "Calendar", path: "/admin/events/calendar" },
    //     { title: "Featured Events", path: "/admin/events/featured" },
    //     { title: "Event Status", path: "/admin/events/status" }
    //   ]
    // },
    // { 
    //   title: "Website Content", 
    //   icon: <FaCog className="md:mr-3 text-lg" />,
    //   submenu: [
    //     { title: "Homepage", path: "/admin/content/home" },
    //     { title: "About Us", path: "/admin/content/about" },
    //     { title: "Committees", path: "/admin/content/committees" },
    //     { title: "Announcements", path: "/admin/content/announcements" }
    //   ]
    // }
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-indigo-700 p-2 rounded-lg"
      >
        {isExpanded ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex bg-[#0B0D2C] text-white h-screen w-64 fixed top-0 left-0 flex-col z-40">
        <div className="p-6 flex flex-col items-center border-b border-indigo-700">
          <img src={h} alt="Admin" className="w-16 h-16 rounded-full object-cover" />
          <h2 className="text-lg font-semibold mt-3">Admin Panel</h2>
          <p className="text-sm text-gray-300">admin@smec.com</p>
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto">
          {adminMenu.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <div className="relative border-b border-indigo-800">
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className={`flex items-center justify-between w-full p-4 text-base ${
                      openDropdown === item.title ? "bg-indigo-700" : "hover:bg-indigo-700"
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {item.title}
                    </div>
                    {openDropdown === item.title ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  
                  {openDropdown === item.title && item.submenu.map((subItem) => (
                    <NavLink
                      key={subItem.title}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `block pl-16 pr-4 py-3 text-sm ${
                          isActive ? "bg-indigo-800" : "hover:bg-indigo-700"
                        }`
                      }
                    >
                      {subItem.title}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-4 text-base ${
                      isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
                    }`
                  }
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden bg-[#0B0D2C] text-white h-screen w-64 fixed top-0 left-0 transform ${
        isExpanded ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-40`}>
        <div className="p-6 border-b border-indigo-700">
          <div className="flex items-center justify-between">
            <img src={h} alt="Admin" className="w-12 h-12 rounded-full" />
            <button onClick={toggleSidebar} className="text-white">
              <FaTimes className="text-2xl" />
            </button>
          </div>
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto">
          {adminMenu.map((item) => (
            <div key={item.title} className="border-b border-indigo-800">
              {item.submenu ? (
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className="flex items-center justify-between w-full p-4 text-base"
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {item.title}
                    </div>
                    {openDropdown === item.title ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  
                  {openDropdown === item.title && item.submenu.map((subItem) => (
                    <NavLink
                      key={subItem.title}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `block pl-16 pr-4 py-3 text-sm ${
                          isActive ? "bg-indigo-800" : "hover:bg-indigo-700"
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      {subItem.title}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-4 text-base ${
                      isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
                    }`
                  }
                  onClick={toggleSidebar}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
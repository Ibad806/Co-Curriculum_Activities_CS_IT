import { useState, useEffect, useRef } from "react";
import { FaBars, FaBell, FaUser } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import smeclogo from "../assets/smecfinallogo.png";

const BlackNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const role = "user";

  const dropdownRef = useRef(null);

  const notifications = [
    {
      id: 1,
      content: "Shamsul Haque invited you to like his page.",
      time: "4 hours ago",
    },
    {
      id: 2,
      content: "Muhammad Huzaifa invited you to like Tesla Cattle Farm.",
      time: "5 days ago",
    },
    {
      id: 3,
      content: "Muhammad Huzaifa invited you to like Tesla Cattle Farm.",
      time: "a week ago",
    },
    {
      id: 4,
      content: 'Ayush Mishra Baazigar shared a reel: "#fvp🔥viral".',
      time: "a week ago",
    },
    {
      id: 5,
      content: "Muhammad Hashim invited you to like Tesla Cattle Farm.",
      time: "a week ago",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown) => {
    setIsUserDropdownOpen(dropdown === "user" ? !isUserDropdownOpen : false);
    setIsCategoryDropdownOpen(
      dropdown === "category" ? !isCategoryDropdownOpen : false
    );
    setIsNotificationOpen(
      dropdown === "notification" ? !isNotificationOpen : false
    );
    setIsMobileCategoryOpen(
      dropdown === "mobileCategory" ? !isMobileCategoryOpen : false
    );
  };

  return (
    <div className="w-full px-6 flex items-center justify-center flex-col relative bg-black">
      <nav
        className={`fixed top-5 z-50 border-2 w-[93%] md:w-[94%] lg:w-[94%] rounded-full flex items-center justify-between px-8 py-3 shadow-lg ${
          isScrolled ? "bg-black" : "bg-black"
        } transition-colors duration-500 border-[#211D70] transform ease-in-out ${
          isScrolled ? "scale-95" : "scale-100"
        }`}
      >
        <Link
          to="/"
          className="text-lg font-medium text-white hover:text-[#211D70] transition duration-500"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            {/* Replace with dynamic profile image */}
            <img
              src={smeclogo}
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/smec"
            className="text-lg font-medium text-white hover:text-[#211D70] transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/userpanel/ticket"
            className="text-lg font-medium text-white hover:text-[#211D70] transition duration-300"
          >
            Tickets
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-lg font-medium text-white hover:text-[#211D70] transition duration-300"
              onClick={() =>
                toggleDropdown(!isCategoryDropdownOpen ? "category" : "")
              }
            >
              Category
            </button>
            {isCategoryDropdownOpen && (
              <div className="absolute mt-2 bg-black text-white shadow-lg rounded-lg p-3 w-40">
                <Link
                  to="/smec/egames"
                  className="block p-2 hover:bg-[#211D70] hover:text-white transition duration-300"
                >
                  E-Gaming
                </Link>
                <Link
                  to="/smec/geekgames"
                  className="block p-2 hover:bg-[#211D70] hover:text-white transition duration-300"
                >
                  Geeks Gaming
                </Link>
                <Link
                  to="/smec/generalgames"
                  className="block p-2 hover:bg-[#211D70] hover:text-white transition duration-300"
                >
                  General Gaming
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4" ref={dropdownRef}>
          <div className="relative">
            <button
              className="p-2 hover:bg-[#211D70]/10 rounded-full transition-colors"
              onClick={() =>
                toggleDropdown(!isNotificationOpen ? "notification" : "")
              }
            >
              <FaBell className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 bg-[#242526] text-white shadow-lg rounded-lg w-[360px] max-h-[90vh] overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                  <h2 className="text-2xl font-bold">Notifications</h2>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-gray-400">All</div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-2 hover:bg-[#3A3B3C] flex items-start gap-3"
                      >
                        <div className="flex-1">
                          <p className="text-[15px] leading-5">
                            {notification.content}
                          </p>
                          <p className="text-[13px] text-blue-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full p-3 text-center hover:bg-[#3A3B3C] border-t border-gray-700 text-[15px] text-gray-400">
                  See previous notifications
                </button>
              </div>
            )}
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              className="p-2 hover:bg-[#211D70]/10 rounded-full transition-colors"
              onClick={() => toggleDropdown(!isUserDropdownOpen ? "user" : "")}
            >
              <FaUser className="w-5 h-5 text-white" />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-black text-white shadow-lg rounded-lg p-3 w-40">
                {role === "user" && (
                  <Link
                    to="/userpanel/home"
                    className="block p-2 hover:bg-[#211D70] hover:text-white transition duration-300"
                  >
                    User Dashboard
                  </Link>
                )}
                {role === "judge" && (
                  <Link
                    to="/judgespanel/home"
                    className="block p-2 hover:bg-[#211D70] hover:text-white transition duration-300"
                  >
                    Judges Dashboard
                  </Link>
                )}
                <button className="block p-2 w-full text-left hover:bg-[#211D70] hover:text-white transition duration-300">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="md:hidden p-2 hover:bg-[#211D70]/10 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <ImCross className="w-5 h-5 text-white" />
          ) : (
            <FaBars className="w-5 h-5 text-white" />
          )}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 right-0 left-0 bg-black text-white shadow-lg rounded-lg animate-slideIn transition-all duration-300 z-40">
          <div className="flex flex-col items-start p-6 space-y-4">
            <Link
              to="/smec"
              className="text-white hover:text-[#211D70] transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/userpanel/ticket"
              className="text-white hover:text-[#211D70] transition duration-300"
            >
              Tickets
            </Link>
            <button
              className="text-white hover:text-[#211D70] transition duration-300"
              onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
            >
              Category
            </button>
            {isMobileCategoryOpen && (
              <div className="mt-2 bg-black text-white shadow-lg rounded-lg p-3 w-40">
                <Link
                  to="/smec/egames"
                  className="block p-2 hover:bg-[#211D70] transition duration-300"
                >
                  E-Gaming
                </Link>
                <Link
                  to="/smec/geekgames"
                  className="block p-2 hover:bg-[#211D70] transition duration-300"
                >
                  Geeks Gaming
                </Link>
                <Link
                  to="/smec/generalgames"
                  className="block p-2 hover:bg-[#211D70] transition duration-300"
                >
                  General Gaming
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlackNavbar;

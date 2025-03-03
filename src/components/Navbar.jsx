import { useState, useEffect, useRef } from "react";
import { FaBell, FaUser, FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { AppRoutes } from "../constant/constant";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, content: "New event added!", time: "2 hours ago" },
    { id: 2, content: "Your ticket has been confirmed.", time: "1 day ago" },
    { id: 3, content: "Reminder: Event starts tomorrow!", time: "3 days ago" },
  ];

  const token = Cookies.get("authToken");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(AppRoutes.logout, {}, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      Cookies.remove("authToken");
      Cookies.remove("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full px-6 flex items-center justify-center flex-col relative">
      <nav
        className={`fixed top-5 z-50 border-2 w-[93%] md:w-[94%] lg:w-[94%] rounded-full flex items-center justify-between px-8 py-3 shadow-lg ${
          isScrolled ? "bg-white text-black" : "bg-black text-white"
        } `}
      >
        <Link to="/" className="text-lg font-medium">CAC</Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-lg font-medium">Home</Link>
          <Link to="/events" className="text-lg font-medium">Events</Link>
          <Link to="/gallery" className="text-lg font-medium">Gallery</Link>
          <Link to="/all-news" className="text-lg font-medium">News</Link>
        </div>
        <div className="flex items-center space-x-4 relative">
          <div className="relative" ref={notificationRef}>
            <button
              className="p-2 hover:bg-gray-200 hover:text-black rounded-full transition-colors relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <FaBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg w-72 max-h-80 overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-gray-300">
                  <h2 className="text-lg font-bold">Notifications</h2>
                </div>
                <div className="overflow-y-auto max-h-60">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-2 hover:bg-gray-100">
                      <p className="text-sm">{notification.content}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full p-3 text-center hover:bg-gray-100 border-t border-gray-300 text-sm text-gray-600">
                  See previous notifications
                </button>
              </div>
            )}
          </div>
          <div className="relative" ref={userDropdownRef}>
            <button
              className="p-2 hover:bg-gray-200 hover:text-black rounded-full transition-colors"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <FaUser className="w-5 h-5" />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg py-2">
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                    <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <button
          className="md:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <ImCross className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 right-0 left-0 bg-white text-black shadow-lg rounded-lg animate-slideIn transition-all duration-300 z-40">
          <div className="flex flex-col items-start p-6 space-y-4">
            <Link to="/" className="hover:underline text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/events" className="hover:underline text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            <Link to="/gallery" className="hover:underline text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

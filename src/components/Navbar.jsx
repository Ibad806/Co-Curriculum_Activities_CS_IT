import { useState, useEffect } from "react";
import { FaBell, FaUserAlt, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full px-6 flex items-center justify-center flex-col relative">
      {/* Main Navbar */}
      <nav
        className={`fixed top-5 z-50 border-2 w-[93%] md:w-[94%] lg:w-[94%] rounded-full flex items-center justify-between px-8 py-3 shadow-lg ${
          isScrolled ? "bg-white text-black" : "bg-white text-white"
        }`}
      >    
        {/* Logo */}
        <Link
          to="/"
          className={`text-lg font-medium transition duration-500 ${
            isScrolled ? "text-black" : "text-black hover:text-black"
          }`}
        >
          CAC
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-lg font-medium transition duration-300 ${
              isScrolled ? "text-black" : "text-black"
            }`}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={`text-lg font-medium transition duration-300 ${
              isScrolled ? "text-black" : "text-black hover:text-black"
            }`}
          >
            Events
          </Link>
          <Link
            to="/gallery"
            className={`text-lg font-medium transition duration-300 ${
              isScrolled ? "text-black" : "text-black hover:text-black"
            }`}
          >
            Gallery
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4 relative">
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <FaBell
              className={`w-5 h-5 ${isScrolled ? "text-black" : "text-black"}`}
            />
          </button>

          {/* User Dropdown on Hover (Profile Icon Only) */}
          <div className="relative group">
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <FaUserAlt
                className={`w-5 h-5 ${
                  isScrolled ? "text-black" : "text-black"
                }`}
              />
            </button>
            <div
              className="absolute top-12 right-0 bg-white text-black shadow-lg rounded-lg w-64 p-6 transition-transform transform origin-top-right scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 duration-300"
            >
              {/* User Info */}
              <div className="flex items-center space-x-4 mb-4">
                <FaUserAlt className="w-10 h-10 text-gray-700" />
                <div>
                  <p className="text-lg font-medium truncate">Rameez Rafiq</p>
                  <p className="text-sm text-gray-500 truncate">
                    rameez123@gmail.com
                  </p>
                </div>
              </div>
              {/* Menu Options */}
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaSignInAlt className="text-lg" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/adminpanel/home"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaUserAlt className="text-lg" />
                  <span>Admin Panel</span>
                </Link>
                <Link
                  to="/userpanel/home"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaUser className="text-lg" />
                  <span>Your Dashboard</span>
                </Link>
              </div>
              {/* Logout Button */}
              <button
                onClick={() => alert("Logged out!")}
                className="flex items-center justify-center w-full p-2 mt-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <FaSignOutAlt className="text-lg mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

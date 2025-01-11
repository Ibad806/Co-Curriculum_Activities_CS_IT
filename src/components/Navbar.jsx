import { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
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
          isScrolled ? "bg-white text-black" : "bg-transparent text-white"
        } `}
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
            to="/userpanel/home"
            className={`text-lg font-medium transition duration-300 ${
              isScrolled ? "text-black" : "text-black hover:text-black"
            }`}
          >
            User Panel
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
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <FaBell className={`w-5 h-5 ${
              isScrolled ? "text-black" : "text-black"
            }`} />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <FaUser className={`w-5 h-5 ${
              isScrolled ? "text-black" : "text-black"
            }`} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <ImCross className={`w-5 h-5 ${
              isScrolled ? "text-black" : "text-black"
            }`} />
          ) : (
            <FaBars className={`w-5 h-5 ${
              isScrolled ? "text-black" : "text-black"
            }`} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 right-0 left-0 bg-white text-black shadow-lg rounded-lg animate-slideIn transition-all duration-300 z-40">
          <div className="flex flex-col items-start p-6 space-y-4">
            <Link
              to="/"
              className={`hover:underline text-sm font-medium hover:text-gray-600 transition duration-300 w-full text-center`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`hover:underline text-sm font-medium hover:text-gray-600 transition duration-300 w-full text-center`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/tickets"
              className={`hover:underline text-sm font-medium hover:text-gray-600 transition duration-300 w-full text-center`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tickets
            </Link>
            <Link
              to="/gallery"
              className={`hover:underline text-sm font-medium hover:text-gray-600 transition duration-300 w-full text-center`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

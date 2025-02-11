import { useState, useEffect, useRef } from "react";
import { FaBell, FaBars, FaUser } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
        <Link to="/" className="text-lg font-medium transition duration-500 ">
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
          <button className="p-2 hover:bg-gray-200 hover:text-black rounded-full transition-colors">
            <FaBell className="w-5 h-5 " />
          </button>
          <div className="relative" ref={userDropdownRef}>
            <button
              className="p-2 hover:bg-gray-200 hover:text-black rounded-full transition-colors"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <FaUser className="w-5 h-5" />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg py-2">
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <ImCross className="w-5 h-5 text-white" /> : <FaBars className="w-5 h-5 text-white" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 right-0 left-0 bg-white text-black shadow-lg rounded-lg animate-slideIn transition-all duration-300 z-40">
          <div className="flex flex-col items-start p-6 space-y-4">
            <Link to="/" className="hover:underline text-sm font-medium hover:text-gray-600 w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/events" className="hover:underline text-sm font-medium hover:text-gray-600 w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            <Link to="/tickets" className="hover:underline text-sm font-medium hover:text-gray-600 w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Tickets</Link>
            <Link to="/gallery" className="hover:underline text-sm font-medium hover:text-gray-600 w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
          </div>
        </div>)}
    </div>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
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
    <div
      className={`w-full px-6 flex items-center justify-center flex-col relative ${
        props.navcolor
      }`}
    >
      {/* Main Navbar */}
      <nav
        className={`fixed top-5 z-50 border-2 w-full md:w-[94%] lg:w-[94%] rounded-full flex items-center justify-between px-8 py-3 shadow-lg ${
          isScrolled ? props.navcolor : "bg-transparent"
        } transition-colors duration-500 ${props.bordercolor}`}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`hover:underline text-lg font-medium transition duration-500 ${
            props.linkcolor
          }`}
        >
          CAC
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`hover:underline text-lg font-medium transition duration-300 ${
              props.linkcolor
            }`}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={`hover:underline text-lg font-medium transition duration-300 ${
              props.linkcolor
            }`}
          >
            Events
          </Link>
          <Link
            to="/tickets"
            className={`hover:underline text-lg font-medium transition duration-300 ${
              props.linkcolor
            }`}
          >
            Tickets
          </Link>
          <Link
            to="/gallery"
            className={`hover:underline text-lg font-medium transition duration-300 ${
              props.linkcolor
            }`}
          >
            Gallery
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <FaBell className={`w-5 h-5 ${props.linkcolor}`} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <FaUser className={`w-5 h-5 ${props.linkcolor}`} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <ImCross className={`w-5 h-5 ${props.linkcolor}`} />
          ) : (
            <FaBars className={`w-5 h-5 ${props.linkcolor}`} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white shadow-lg mt-4 rounded-lg">
          <div className="flex flex-col items-start p-6 space-y-4">
            <Link
              to="/"
              className={`hover:underline text-sm font-medium ${props.linkcolor}`}
            >
              Homes
            </Link>
            <Link
              to="/events"
              className={`hover:underline text-sm font-medium ${props.linkcolor}`}
            >
              Events
            </Link>
            <Link
              to="/tickets"
              className={`hover:underline text-sm font-medium ${props.linkcolor}`}
            >
              Tickets
            </Link>
            <Link
              to="/gallery"
              className={`hover:underline text-sm font-medium ${props.linkcolor}`}
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

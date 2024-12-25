import { useState } from "react";
import { FaSearch, FaBell, FaUser, FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full px-[2vw] pb-6 flex items-center justify-center flex-col relative bg-black">      
      <nav className="relative z-10 bg-white rounded-full w-[100%] m-auto mt-6 px-6 py-4 flex items-center justify-between shadow-lg">
        <Link to="/" className="text-xl font-bold">
          Logo
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Events
          </Link>
          <Link
            to="/tickets"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Tickets
          </Link>
          <Link
            to="/gallery"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Gallery
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaSearch className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaBell className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaUser className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <ImCross className="w-5 h-5 text-gray-700" />
          ) : (
            <FaBars className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </nav>

      {/* MOBILE RESPONSIVE */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 right-14 w-[50%] flex justify-center bg-white rounded-lg shadow-lg p-4 z-10 mt-10">
          <div className="flex flex-col space-y-4 ">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Events
            </Link>
            <Link
              to="/tickets"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Tickets
            </Link>
            <Link
              to="/gallery"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Gallery
            </Link>
          </div>
        </div>
      )}
      {/* MOBILE RESPONSIVE */}
    </div>
  );
}

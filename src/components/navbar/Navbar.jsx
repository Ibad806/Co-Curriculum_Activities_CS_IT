import { useState } from 'react'
import { FaSearch, FaBell, FaUser, FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="w-full h-96 bg-[#0a0a29] p-4">
      <nav className="relative z-10 bg-white rounded-full w-[90%] m-auto mt-8 px-6 py-4 flex items-center justify-between shadow-lg">
        <Link to="/" className="text-xl font-bold">
          Logo
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-gray-900 transition-colors">
            Events
          </Link>
          <Link to="/tickets" className="text-gray-700 hover:text-gray-900 transition-colors">
            Tickets
          </Link>
          <Link to="/gallery" className="text-gray-700 hover:text-gray-900 transition-colors">
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
          <FaBars className="w-6 h-6 text-gray-700" />
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-gray-900 transition-colors">
              Events
            </Link>
            <Link to="/tickets" className="text-gray-700 hover:text-gray-900 transition-colors">
              Tickets
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-gray-900 transition-colors">
              Gallery
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}


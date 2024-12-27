import React from "react";
import { FaBuilding, FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa'

const EventCard = ({ image, title, location, price, dateRange, timeToEnd , daysLeft }) => {
  return (
    <div className="max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Image Container */}
      <div className="relative">
        <img
          src={image}
          alt="Event venue"
          className="h-48 w-full object-cover"
        />
        {/* Date Badge */}
        <div className="absolute left-4 top-4 flex flex-col items-center rounded bg-orange-400 px-3 py-1 text-white">
          <span className="text-2xl font-bold">{daysLeft}</span>
          <span className="text-sm font-semibold">DAYS</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative p-4">
        {/* Red Accent Line */}
        <div className="absolute left-0 top-0 h-full w-1 bg-black"></div>
        
        {/* Content with left padding to account for red line */}
        <div className="pl-4">
          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-gray-800">
           {title}
          </h3>

          {/* Price */}
          <p className="mb-3 text-orange-400">
            Price Starts from: <span className="">{price}</span>
          </p>

          {/* Organizer */}
          <div className="mb-2 flex items-start gap-2">
          <FaBuilding className="mt-1 h-4 w-4 text-gray-600" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Organized By:</span> Computer Science Department
            </p>
          </div>

          {/* Location */}
          <div className="mb-2 flex items-start gap-2">
          <FaMapMarkerAlt className="mt-1 h-4 w-4 text-gray-600" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Location:</span> {location}
            </p>
          </div>

          {/* Date and Time */}
          <div className="flex items-start gap-2">
          <FaRegCalendarAlt className="mt-1 h-4 w-4 text-gray-600" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{dateRange}</span> {timeToEnd}
            </p>
          </div>
          {/* Explore Event Button */}
          <button className="w-full mt-5 rounded bg-black py-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
            Explore Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard



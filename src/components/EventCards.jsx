import React from "react";
import { FaBuilding, FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import Button from "./Button"; // assuming you have this custom Button component

const EventCard = ({ image, title, location, price, dateRange, timeToEnd, daysLeft }) => {
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 relative">
      {/* Card Image and Overlay */}
      <div className="relative group">
        <img 
          className="w-full h-64 object-cover rounded-t-xl transition-all duration-300 ease-in-out group-hover:opacity-80"
          src={image} 
          alt={title} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50 group-hover:opacity-80 transition-all duration-500 ease-in-out"></div>
        <div className="absolute top-4 left-4 right-4 text-white font-bold text-2xl md:text-3xl bg-black bg-opacity-50 p-2 rounded-lg transform translate-y-1/2 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          {title}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4 space-y-3 bg-white border-t border-gray-200">
        {/* Location and Price */}
        <div className="flex items-center text-gray-700 space-x-2">
          <FaMapMarkerAlt className="text-xl text-gray-500" />
          <span className="text-sm font-semibold">{location}</span>
        </div>

        {/* <div className="flex items-center text-gray-700 space-x-2">
          <FaBuilding className="text-xl text-gray-500" />
          <span className="text-sm font-semibold">{price}</span>
        </div> */}

        {/* Date and Time */}
        <div className="flex items-center text-gray-700 space-x-2">
          <FaRegCalendarAlt className="text-xl text-gray-500" />
          <span className="text-sm font-semibold">{dateRange}</span>
        </div>

        {/* Time Remaining */}
        <div className="flex justify-between items-center text-gray-700 text-sm">
          <div className="flex items-center space-x-2">
            <div className="font-semibold text-lg text-gray-800">Time Left</div>
            <div className={`px-2 py-1 rounded-md ${daysLeft <= 3 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
              {daysLeft} Days
            </div>
          </div>
          <div className="text-sm text-gray-500">{timeToEnd}</div>
        </div>

        {/* Animated Button */}
        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-2 px-4 rounded-md transform hover:scale-105">
          Register Now
        </Button>
      </div>

      {/* Hover Info and Extra Details */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <div className="text-white bg-black bg-opacity-70 p-3 rounded-lg">
          <h3 className="text-lg font-semibold">Special Features</h3>
          <p className="text-sm mt-2">Join the event to explore exciting opportunities, great networking, and memorable experiences. Limited spots available!</p>
        </div>
      </div>

      {/* Badge for Urgency */}
      {daysLeft <= 3 && (
        <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-lg text-sm font-bold">
          Hurry! Limited Spots
        </div>
      )}
    </div>
  );
};

export default EventCard;

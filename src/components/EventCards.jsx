import React from "react";
import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import Button from "./Button";

const EventCard = ({ image, title, location, price, dateRange, daysLeft, category }) => {
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative">
      <div className="relative group">
        <img 
          className="w-full h-64 object-cover rounded-t-xl transition-all duration-300 ease-in-out group-hover:opacity-90"
          src={image} 
          alt={title} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=Event+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent group-hover:from-black/40 transition-all duration-500 ease-in-out"></div>
        
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            category === 'ticketing' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
          }`}>
            {category === 'ticketing' ? 'Ticketed' : 'Free'}
          </span>
        </div>
        
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
            {daysLeft} {daysLeft === 1 ? 'Day' : 'Days'} Left
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-4 space-y-3 bg-white">
        <div className="flex items-center text-gray-700 space-x-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <span className="text-sm font-medium truncate">{location}</span>
        </div>

        <div className="flex items-center text-gray-700 space-x-2">
          <FaRegCalendarAlt className="text-gray-500" />
          <span className="text-sm font-medium">{dateRange}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold text-gray-800">
             {/* {category === 'ticketing' ? 'Ticketed' : 'Free'} */}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-black py-2 px-4 rounded-md">
            View Details
          </Button>
        </div>
      </div>



      {daysLeft <= 1 ? (
  daysLeft > 0 ? (
    <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-lg text-xs font-bold animate-pulse">
          Hurry! Ending Soon
        </div>
  ) : (
    <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-lg text-xs font-bold animate-pulse">
          Event Ended
        </div>
  )
) : null}

       
    </div>
  );
};

export default EventCard;
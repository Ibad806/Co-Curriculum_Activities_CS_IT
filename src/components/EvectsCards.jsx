import React from "react";
import { FaClock } from "react-icons/fa";

const EventCard = ({ image, title, location, price, dateRange, timeToEnd }) => {
  return (
    <div className="max-w-sm mx-auto border rounded-lg overflow-hidden">
      <div className="relative aspect-square ">
        <img
          src={image}
          alt="Event logo"
          className="w-full h-full"
        />
        {/* <div className="absolute bottom-0 left-0 right-0 border-t"> */}
          <div className="flex items-center gap-2 bg-[#6b21a8] text-gray-200  p-2">
            <FaClock className="h-4 w-4" />
            <span className="text-sm">Time to end</span>
            <span className="font-mono">{timeToEnd}</span>
          {/* </div> */}
        </div>
      </div>
      <div className="p-4 space-y-2 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold ">{title}</h2>
            <p className="text-sm text-gray-400">{location}</p>
          </div>
          <span className="text-lg font-bold ">{price}</span>
        </div>
        <p className="text-sm text-gray-400">{dateRange}</p>
      </div>
      <div className=" bg-white">
        <button className="w-full bg-[#6b21a8] hover:bg-[#7c3aed] text-white font-medium py-2 px-4 rounded transition-colors">
          Explore
        </button>
      </div>
    </div>
  );
};

export default EventCard;

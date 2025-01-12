import React from "react";
import { FaBuilding, FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa'
import smecbanner from "../assets/smec_banner.png";
import qawalibanner from "../assets/qawali_banner.png";
import qawali from "../assets/qawali.png";

const EventCard = ({ image, title, location, price, dateRange, timeToEnd , daysLeft }) => {
  return (
    <>
    <div className="h-96 w-full bg-red-500 relative rounded-xl ">
      <img className="w-full h-full object-cover rounded-xl" src={image} alt="" />
      <div className="absolute top-5 left-5 right-0 bottom-0 text-white">
        <h2 className="text-xl font-extrabold">{title}</h2>
      </div>
      <div className="absolute bottom-5 left-5 right-0 text-white">
        <h2 className="text-xl">{dateRange}</h2>
      </div>
    </div>
    </>
  )
}

export default EventCard



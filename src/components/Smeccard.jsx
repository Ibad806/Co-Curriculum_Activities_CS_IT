import React from "react";
import { Link } from "react-router-dom";

const Smeccard = ({ title, image, category, id }) => {
  
  const cleanTitle = title.toLowerCase().replace(/[\s-]/g, '');
  const categoryUrl = `/events/smec/${cleanTitle}?id=${id}`;


  return (
      <div className="relative w-[300px] h-[400px] text-white border border-white rounded-[10px] group hover:scale-105 transition-transform duration-300 cursor-pointer">
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src={image}
          alt={title}
        />
        <div className="absolute bottom-[8%] left-[25px]">
          <h2 className="font-bold text-[30px] pb-4">{title}</h2>
    <Link to={categoryUrl} className="block">
          <div className="w-[90px] h-[37px] bg-[#211D70] rounded-[80px] group-hover:bg-[#3a34a8] transition-colors duration-300 flex items-center justify-center">
            Explore
          </div>
    </Link>
        </div>
      </div>
  );
};

export default Smeccard;
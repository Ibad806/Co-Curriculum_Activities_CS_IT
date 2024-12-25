import React from "react";
import { Link } from "react-router-dom";
import egamecard from '../assets/egamecard.png'

const Smeccard = (props) => {
  return (
    <>
      <div className="relative w-[300px] h-[400px] text-white border border-solid border-[yellow] rounded-[10px]">
        <img
          className="w-[100%] h-[100%] object-cover rounded-[10px]"
          src={props.image}
          alt=""
        />
        <div className="absolute top-[68%] left-[10px]">
          <h2 className="py-[10px] text-[30px]">{props.title}</h2>
          <Link to={props.url}>
            <button className="w-[90px] h-[37px] bg-[#FFCD5A] rounded-[80px]">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Smeccard;

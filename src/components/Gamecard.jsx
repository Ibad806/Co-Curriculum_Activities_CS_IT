import React from "react";
import h from "../assets/h.png";
import trophy from "../assets/trophy.png";
import vs from "../assets/vs.png";
import arrow from "../assets/Buy Arrow.png";

const Gamecard = ({
  title,
  image,
  gamedesc,
  date,
  time,
  winprice,
  playerslot,
}) => {
  return (
    <>
      <div className="bg-[#313231] w-full max-w-[90%] md:max-w-[400px] lg:max-w-[500px] rounded-[10px] h-auto mx-auto">
        <img
          className="w-full h-[200px] md:h-[220px] object-cover p-2 rounded-[15px]"
          src={h}
          alt="Game Card"
        />
        <div className="text-white px-3">
          <h6 className="py-1 text-[#9A9A9A] text-sm">
            {date}, <span className="text-[#9A9A9A]">{time}</span>
          </h6>
          <h5 className="py-1 text-lg font-bold text-white">{title}</h5>
          <h6 className="py-3 text-[#9A9A9A] text-sm line-clamp-2 overflow-hidden text-ellipsis">
            {gamedesc}
          </h6>
          <hr />
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center justify-center flex-col">
              <h6 className="py-2 text-[#9A9A9A] text-sm">Win Price</h6>
              <div className="flex items-center justify-between gap-[0.3vw]">
                <img className="w-8" src={trophy} alt="trophy" />
                <h6>{winprice}</h6>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h6 className="py-2 text-[#9A9A9A] text-sm">Player Slot</h6>
              <div className="flex items-center justify-between gap-1">
                <img className="w-8" src={vs} alt="4v4" />
                <h6>{playerslot}</h6>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="p-2  rounded-full bg-[#FACB67] flex items-center justify-center cursor-pointer">
                <img className="w-8" src={arrow} alt="4v4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gamecard;

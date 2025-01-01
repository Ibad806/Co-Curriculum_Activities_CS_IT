import React from "react";
import smec_banner from "../assets/smec_banner.png";
import watch from "../assets/stopwatch-start.png";
import view from "../assets/arrowcircle.png";
import rightarrow from "../assets/rightarrow.png";
import { Link } from "react-router-dom";

const Availableevents = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center flex-col relative py-[50px] border-blue rounded-[10px]">
        <h1 className="md:text-[40px] text-[20px]">Time is Running Out!</h1>
        <h2 className="md:text-[25px] text-[15px] py-[10px]">
          Explore event here.
        </h2>
        <div className="md:w-[75%] w-[90%] h-[400px] rounded-[25px] relative">
          <img
            className="w-[100%] h-[100%] object-cover rounded-[10px]"
            src={smec_banner}
            alt=""
          />
          <div className="flex items-center justify-center absolute top-0 right-0 z-[10] bg-yellow-500 md:w-[30%] w-[40%] h-[12%] rounded-bl-[15px] md:p-4 p-1 text-white">
            <img className="w-[30px] px-1" src={watch} alt="" />
            <h6 className="md:text-[10px] text-[6px] font-bold">Time to end</h6>
            <h6 className="md:text-[10px] text-[6px] md:px-[8px] px-[3px] font-bold">
              :
            </h6>
            <h6 className="md:text-[10px] text-[6px] font-bold"> 15 D, 08:45:03</h6>
          </div>
          <div className="flex items-center absolute bottom-[-8%] z-[10] bg-[#EBEBF9] md:w-[68%] w-[100%] h-[15%] rounded-r-[100px] md:p-4 p-1">
            <h3 className="md:text-[25px] text-[12px] font-bold">SMEC</h3>
            <h3 className="px-[10px] font-bold">|</h3>
            <div className="flex items-center justify-center flex-col gap-1">
              <h6 className="md:text-[15px] text-[6px] font-bold">Start Date</h6>
              <h6 className="md:text-[15px] text-[6px] font-bold">10-01-2024</h6>
            </div>
            <h6 className="md:px-[10px] px-[6px] font-bold">→</h6>
            <div className="flex items-center justify-center flex-col gap-1">
              <h6 className="md:text-[15px] text-[6px] font-bold">End Date</h6>
              <h6 className="md:text-[15px] text-[6px] font-bold">10-01-2024</h6>
            </div>
            <h3 className="md:px-[8px] px-[4px] font-bold">|</h3>
            <div className="flex items-center justify-center flex-col gap-1">
              <h6 className="md:text-[15px] text-[6px] font-bold">
                Registration Deadline
              </h6>
              <h6 className="md:text-[15px] text-[6px] font-bold">10-01-2024</h6>
            </div>
            <div className="w-[50px] h-[50px] flex items-center justify-center absolute right-[5%]">
              <Link to='/smec'>
                <div className="w-[40px] h-[40px] md:w-[55px] md:h-[55px] flex items-center justify-center bg-black rounded-[50%]">
                  <img className="w-[20px] h-[20px]" src={rightarrow} alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Availableevents;

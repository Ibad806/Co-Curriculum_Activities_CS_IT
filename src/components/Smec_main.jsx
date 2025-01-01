import React from "react";
import smecban from "../assets/smec_banner.png";
// import borright from '../assets/smec_border_right.png';

const Smec_main = () => {
  return (
    <>
      <img className="w-[100%] h-[100vh] object-cover" src={smecban} alt="" />
      <div className="bg-black text-white flex items-center justify-center flex-col relative w-[100%] overflow-hidden">
        <h1 className="md:text-[110px] text-[70px] md:py-[70px] py-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-black/50 via-[#FECC5A] to-[#FECC5A]">
          SMEC
        </h1>
        <h3 className="text-[#FECC5A] md:text-[34px] text-[3.8vw] md:pb-[45px] pb-[20px]">SPEED | MIND | EXECUTION | COMPETITION</h3>
        <p className="md:text-[20px] text-[4vw] text-center px-11 md:leading-[40px] leading-[25px] pb-[40px]">
          More than just an event, it’s a fiery crucible where games,
          technology, and e-sports collide in an explosive symphony. Ignite
          competitiveness, elevate skills, and join the relentless pursuit of
          mastery. This isn’t merely a competition; it’s a thrilling journey
          that celebrates innovation and unites a community passionate about the
          cutting edge.
        </p>
        {/* <img className="absolute top-0 right-0 object-cover" src={borright} alt="" /> */}
      </div>
    </>
  );
};

export default Smec_main;

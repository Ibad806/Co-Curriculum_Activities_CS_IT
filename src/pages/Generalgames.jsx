import React from "react";
import Gamecard from "../components/Gamecard";
import { generalgames } from "../data";
import Navbar from "../components/Navbar";
import gen from "../assets/gengames_banner.png";

const Generalgames = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-[100%]">
        <img className="w-[100%]" src={gen} alt="" />
        <div className="absolute z-[10] md:top-[43%] top-[35%] md:left-12 left-6 w-[60%] text-white">
          <h1 className="md:pb-10 pb-2 font-bold md:text-[80px] text-[6vw]">General Games</h1>
          <p className="md:text-[20px] text-[2vw] leading-[2.5vw]">
            Discover our extraordinary digital products that will revolutionize
            your design process like never before
          </p>
        </div>
      </div>
      <div className="px-11 w-[100%] bg-black">
        <div className="flex items-center justify-between flex-col md:flex-row w-[100%]">
          <h3 className="py-16 font-bold text-white md:text-[40px] text-[5vw]">Currently Available</h3>
          <input
            type="text"
            placeholder="Search game..."
            className="md:w-80 md:h-12 w-[100%] h-11 focus:outline-none border-[1.5px] border-black rounded-[10px] p-2 mb-9 md:mb-0"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-[110px] md:grid-cols-2 justify-items-center">
            {generalgames.map((gengame) => (
              <Gamecard
                key={gengame.id}
                title={gengame.title}
                image={gengame.image}
                date={gengame.date}
                time={gengame.time}
                winprice={gengame.winprice}
                playerslot={gengame.playerslot}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Generalgames;

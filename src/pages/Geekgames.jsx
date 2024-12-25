import React from "react";
import { geekgames } from "../data";
import Navbar from "../components/Navbar";
import geekbanner from "../assets/geeks_banner.png";
import Gamecard from "../components/Gamecard";
import Footer from "../components/Footer";


const Geekgames = () => {
  return (
    <>
      <Navbar/>
      <div className="relative w-[100%]">
        <img className="w-[100%]" src={geekbanner} alt="" />
        <div className="absolute z-[10] md:top-[43%] top-[35%] md:left-12 left-6 w-[60%] text-white">
          <h1 className="md:pb-10 pb-2 font-bold md:text-[80px] text-[6vw]">
            Geek Games
          </h1>
          <p className="md:text-[20px] text-[2vw] leading-[2.5vw]">
            Discover our extraordinary digital products that will revolutionize
            your design process like never before
          </p>
        </div>
      </div>
      <div className="px-11 w-[100%] bg-black">
        <div className="flex items-center justify-between flex-col md:flex-row w-[100%]">
          <h3 className="py-16 font-bold text-white md:text-[40px] text-[5vw]">
            Currently Available
          </h3>
          <input
            type="text"
            placeholder="Search game..."
            className="md:w-80 md:h-12 w-[100%] h-11 focus:outline-none border-[1.5px] border-black rounded-[10px] p-2 mb-9 md:mb-0"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-[110px] md:grid-cols-2 justify-items-center">
            {geekgames.map((geekgame) => (
              <Gamecard
                key={geekgame.id}
                title={geekgame.title}
                image={geekgame.image}
                date={geekgame.date}
                time={geekgame.time}
                winprice={geekgame.winprice}
                playerslot={geekgame.playerslot}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Geekgames;

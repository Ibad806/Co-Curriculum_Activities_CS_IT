import React, { useState } from "react";
import Gamecard from "../components/Gamecard";
import { generalgames } from "../data";
import Navbar from "../components/Navbar";
import gen from "../assets/gengames_banner.png";
import Footer from "../components/Footer";

const Generalgames = () => {
  const [searchQuery, setSearchQuery] = useState("");
      const filteredGames = generalgames.filter((egame) =>
        egame.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  return (
    <>
      <Navbar
        navcolor="bg-black"
        bordercolor="border-[#FFCD5A]"
        linkcolor="text-white"
      />
      <div className="relative w-full">
        <img className="w-full md:h-[80vh] h-[60vh]" src={gen} alt="General Games Banner" />
        <div className="absolute z-[10] md:top-[43%] top-[35%] md:left-12 left-6 w-[60%] text-white">
          <h1 className="md:pb-10 pb-2 font-bold md:text-[80px] text-[6vw]">General Games</h1>
          <p className="md:text-[20px] text-[2vw] leading-[2.5vw]">
            Discover our extraordinary digital products that will revolutionize
            your design process like never before
          </p>
        </div>
      </div>
      <div className="px-4 md:px-11 w-full bg-black">
        <div className="flex items-center justify-between flex-col md:flex-row w-[100%]">
          <h3 className="py-10 font-bold text-white md:text-[40px] text-[35px]">Currently Available</h3>
          <div>
            <input
              type="text"
              placeholder="Search game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-80 md:h-12 w-[300px] h-11 focus:outline-none border-[1.5px] border-gray-400 rounded-[10px] p-2 mb-5 md:mb-0"
            />
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid pb-10 gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {filteredGames.map((gengame) => (
              <Gamecard
                key={gengame.id}
                title={gengame.title}
                price={gengame.price}
                gamedesc={gengame.gamedesc}
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
      <Footer footercolor="bg-black" footertext="text-white" />
    </>
  );
};

export default Generalgames;

import React, { useState } from "react";
import { geekgames } from "../data";
import geekbanner from "../assets/geeks_banner.png";
import Gamecard from "../components/Gamecard";
import Footer from "../components/Footer";
import BlackNavbar from "../components/BlackNavbar";


const Geekgames = () => {

  const [searchQuery, setSearchQuery] = useState("");
    const filteredGames = geekgames.filter((egame) =>
      egame.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <>
    <BlackNavbar/>
      <div className="relative w-full">
        <img className="w-full" src={geekbanner} alt="Geek Game banner" />
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
      <div className="px-4 md:px-11 w-full bg-black">
        <div className="flex items-center justify-between flex-col md:flex-row w-[100%]">
          <h3 className="py-16 font-bold text-white md:text-[40px] text-[5vw]">
            Currently Available
          </h3>
          <div>
            <input
              type="text"
              placeholder="Search game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-80 bg-[#554f55] md:h-12 w-full h-11 focus:outline-none border-[1.5px] border-gray-400 rounded-[10px] p-2 mb-9 md:mb-0"
            />
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {filteredGames.map((geekgame) => (
              <Gamecard
                key={geekgame.id}
                title={geekgame.title}
                price={geekgame.price}
                gamedesc={geekgame.gamedesc}
                image={geekgame.image}
                category={geekgame.category}
                date={geekgame.date}
                time={geekgame.time}
                winprice={geekgame.winprice}
                playerslot={geekgame.playerslot}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer footercolor="bg-black" footertext="text-white" />
    </>
  );
};

export default Geekgames;

import React from "react";
import Gamecard from "../components/Gamecard";
import { generalgames } from "../data";

const Generalgames = () => {
  return (
    <>
      <div className="px-12 w-[100%] bg-[#161716]">
        <div className="flex items-center justify-between flex-col md:flex-row">
          <h3 className="py-8 font-bold text-white">Currently Available</h3>
          <input
            type="text"
            placeholder="Search game..."
            className="md:w-80 md:h-12 w-30 h-11 focus:outline-none border-[1.5px] border-black rounded-[10px] p-2"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-12 md:grid-cols-2 justify-items-center">
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

import React from "react";
import { smecgames } from "../data";
import Smeccard from "./Smeccard";

const Smeccategory = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-black text-white">
        <h1 className="md:text-[50px] text-[27px] pt-[50px]">
          EXPLORE CATEGORY
        </h1>
        <p className="py-[30px] md:text-[18px] text-[10px]">
          Discover More: Dive Into Our Event Categories
        </p>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-20 md:grid-cols-2 justify-items-center bg-black">
        {smecgames.map((smecgame)=>(
            <Smeccard
            key={smecgame.id}
            title={smecgame.title}
            image={smecgame.image}
            url={smecgame.url}
            />
        ))}
      </div>
    </>
  );
};

export default Smeccategory;

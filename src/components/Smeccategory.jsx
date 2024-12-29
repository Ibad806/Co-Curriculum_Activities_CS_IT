import React from "react";
import { smecgames } from "../data";
import Smeccard from "./Smeccard";
import borright from '../assets/smec_border_right.png';

const Smeccategory = () => {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-10">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          EXPLORE CATEGORY
        </h1>
        <p className="text-sm md:text-lg max-w-3xl mx-auto">
          Discover More: Dive Into Our Event Categories
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-6 lg:px-16 mt-10 relative justify-items-center">
        {smecgames.map((smecgame) => (
          <Smeccard
            key={smecgame.id}
            title={smecgame.title}
            image={smecgame.image}
            url={smecgame.url}
          />
        ))}
        {/* <img className="absolute bottom-0 right-0 object-cover z-10" src={borright} alt="" /> */}
      </div>
    </section>
  );
};

export default Smeccategory;

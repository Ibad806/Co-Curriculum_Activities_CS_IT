import React from "react";
import SmecWinnerCard from "./Smecwinnercard";
import { egameWinners, geekWinners, generalGameWinners } from "../data";

const Smecwinners = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-yellow-600 via-black to-yellow-600 text-white px-6">
      <div className="text-center mb-12">
        <h2 className="md:text-[60px] text-[10vw] font-extrabold tracking-wider">
          WINNERS '24
        </h2>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
          Hall of Fame: Celebrating Our Past Champions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <SmecWinnerCard title="E-GAMING" winners={egameWinners} />
        <SmecWinnerCard title="GEEKS" winners={geekWinners} />
        <SmecWinnerCard title="GENERAL GAMES" winners={generalGameWinners} />
      </div>
    </section>
  );
};

export default Smecwinners;

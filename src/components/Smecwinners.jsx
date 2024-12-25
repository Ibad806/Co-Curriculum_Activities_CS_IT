// src/components/SmecWinners.jsx
import React from "react";
import SmecWinnerCard from "./Smecwinnercard";
import { egameWinners, geekWinners, generalGameWinners } from "../data";

const Smecwinners = () => {
  return (
    <section className="text-center py-10 bg-black text-white px-8 bg-gradient-to-r from-yellow-500 via-black to-yellow-500">
      <h2 className="md:text-[60px] text-[10vw] font-bold mb-6">WINNERS '24</h2>
      <p className="text-lg mb-10">
        Hall of Fame: Celebrating Our Past Champions
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SmecWinnerCard title="E-GAMING" winners={egameWinners} />
        <SmecWinnerCard title="GEEKS" winners={geekWinners} />
        <SmecWinnerCard title="GENERAL GAMES" winners={generalGameWinners} />
      </div>
    </section>
  );
};

export default Smecwinners;

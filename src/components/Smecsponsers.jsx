// SmecSponsor.jsx
import React from "react";
import { sponsors } from "../data";

const Smecsponsors = () => {
  return (
    <div className="bg-black text-white py-20">
      <h2 className="text-center md:text-[60px] text-[10vw] font-bold mb-6">SPONSORS</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-20 py-[100px]">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="text-center text-[30px] font-medium"
          >
            {sponsor.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Smecsponsors;

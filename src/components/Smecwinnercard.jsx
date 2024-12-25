// src/components/SmecWinnerCard.jsx
import React from "react";

const Smecwinnercard = ({ title, winners }) => {
  return (
    <div className="border-2 border-yellow-500 rounded-lg p-4 bg-black text-white">
      <h3 className="text-[28px] font-bold mb-4 text-center">{title}</h3>
      <div className="overflow-auto h-[405px]">
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="text-yellow-500 py-[10px]">WINNERS</th>
              <th className="text-yellow-500 py-[10px]">GAME</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner) => (
              <tr key={winner.id}>
                <td className="py-[3px]">{winner.name}</td>
                <td>{winner.game}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Smecwinnercard;

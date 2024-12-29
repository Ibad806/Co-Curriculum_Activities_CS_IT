// src/components/SmecWinnerCard.jsx
import React from "react";

const SmecWinnerCard = ({ title, winners }) => {
  const displayedWinners = winners.slice(0, 10);

  return (
    <div className="border-2 border-yellow-500 rounded-lg p-6 bg-gradient-to-b from-black via-gray-800 to-black text-white shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400 uppercase tracking-wide">
        {title}
      </h3>

      <div className="bg-gray-900 rounded-lg shadow-inner p-4">
        <table className="table-auto w-full text-left border-collapse">
          <thead className=""> 
            <tr className="bg-gray-800">
              <th className="py-3 px-4 text-yellow-400 uppercase text-sm tracking-wide">
                Winners
              </th>
              <th className="py-3 px-4 text-yellow-400 uppercase text-sm tracking-wide text-right">
                Game
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedWinners.map((winner, index) => (
              <tr
                key={winner.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                } hover:bg-yellow-500 hover:text-black transition duration-200`}
              >
                <td className="py-3 px-4">{winner.name}</td>
                <td className="py-3 px-4  text-right">{winner.game}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm mt-4 text-yellow-300 ">
        {winners.length} winners
      </p>
    </div>
  );
};

export default SmecWinnerCard;

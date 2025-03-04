import React from 'react';

const SmecWinnerCard = ({ title, winners }) => {
  const displayedWinners = winners.slice(0, 7);

  return (
    <div className="border-2 border-[#211D70] rounded-lg p-4 sm:p-6 bg-black text-white shadow-lg transform transition duration-500 ">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center uppercase tracking-wide animate-pulse">
        {title}
      </h3>

      <div className="bg-black rounded-lg shadow-inner p-2 sm:p-4 overflow-hidden">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-black">
              <th className="py-2 sm:py-3 px-2 sm:px-4 bg-[#211D70] uppercase text-xs sm:text-sm tracking-wide">
                Winners
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 bg-[#211D70] uppercase text-xs sm:text-sm tracking-wide text-right">
                Game
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedWinners.map((winner, index) => (
              <tr
                key={index}
                className="bg-black hover:bg-[#211D70] hover:text-white transition duration-200 ease-in-out transform hover:-translate-y-1 "
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4">{winner.name}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">{winner.game}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-xs sm:text-sm mt-2 sm:mt-4 text-white">
        {winners.length} winners
      </p>
    </div>
  );
};

export default SmecWinnerCard;

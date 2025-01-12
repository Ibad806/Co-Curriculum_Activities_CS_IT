import React, { useState } from "react";

const UserWinners = () => {
  // Mock data for winners
  const gamesList = [
    {
      id: 1,
      name: "PUBG",
      winner: "Team Alpha",
      year: "2025",
      score: "15-10",
      details: "Team Alpha members: John, Mike, Sarah, David",
      opponent: "Team Bravo",
      finalDate: "2025-08-12",
    },
    {
      id: 2,
      name: "Soccer",
      winner: "Team Lions",
      year: "2024",
      score: "3-2",
      details: "Team Lions: Alex, Chris, Sam, Oliver",
      opponent: "Team Tigers",
      finalDate: "2024-07-15",
    },
    {
      id: 3,
      name: "Chess",
      winner: "Player X",
      year: "2025",
      score: "1-0",
      details: "Player X outmaneuvered Player Y in the finals",
      opponent: "Player Y",
      finalDate: "2025-09-01",
    },
    {
      id: 4,
      name: "Valorant",
      winner: "Team Phoenix",
      year: "2025",
      score: "13-8",
      details: "Team Phoenix members: Luna, Ava, Ethan, Noah",
      opponent: "Team Shadow",
      finalDate: "2025-10-10",
    },
    {
      id: 5,
      name: "Cricket",
      winner: "Team Eagles",
      year: "2023",
      score: "178/4 - 176/7",
      details: "Team Eagles won by 2 runs",
      opponent: "Team Hawks",
      finalDate: "2023-11-11",
    },
    {
      id: 6,
      name: "Basketball",
      winner: "Team Dunkers",
      year: "2022",
      score: "82-75",
      details: "Team Dunkers dominated the final quarter",
      opponent: "Team Swish",
      finalDate: "2022-12-12",
    },
    {
      id: 7,
      name: "Badminton",
      winner: "Player A",
      year: "2023",
      score: "21-15, 21-18",
      details: "Player A defeated Player B in straight sets",
      opponent: "Player B",
      finalDate: "2023-01-15",
    },
    {
      id: 8,
      name: "Tennis",
      winner: "Player Serena",
      year: "2024",
      score: "6-3, 6-4",
      details: "Player Serena claimed the title in straight sets",
      opponent: "Player Venus",
      finalDate: "2024-02-20",
    },
    {
      id: 9,
      name: "Volleyball",
      winner: "Team Spikers",
      year: "2025",
      score: "3-1",
      details: "Team Spikers triumphed over Team Blockers",
      opponent: "Team Blockers",
      finalDate: "2025-03-18",
    },
    {
      id: 10,
      name: "Hockey",
      winner: "Team Wolves",
      year: "2022",
      score: "2-1",
      details: "Team Wolves secured the victory in overtime",
      opponent: "Team Bears",
      finalDate: "2022-04-14",
    },
    {
      id: 11,
      name: "Rugby",
      winner: "Team Chargers",
      year: "2024",
      score: "35-30",
      details: "Team Chargers edged out Team Bulls",
      opponent: "Team Bulls",
      finalDate: "2024-05-10",
    },
    {
      id: 12,
      name: "Table Tennis",
      winner: "Player C",
      year: "2025",
      score: "11-9, 11-7, 11-8",
      details: "Player C swept Player D in the finals",
      opponent: "Player D",
      finalDate: "2025-06-25",
    },
    {
      id: 13,
      name: "Kabaddi",
      winner: "Team Warriors",
      year: "2023",
      score: "58-47",
      details: "Team Warriors showed dominance in the finals",
      opponent: "Team Raiders",
      finalDate: "2023-07-30",
    },
  ];

  const [visibleGames, setVisibleGames] = useState(6);
  const [selectedGame, setSelectedGame] = useState(null);

  // Handle showing more games
  const handleSeeMore = () => {
    setVisibleGames((prev) => prev + 6);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="shadow-md rounded-lg py-6 px-4 mb-8 bg-white">
        <h1 className="text-4xl font-bold text-gray-800">Game Winners</h1>
        <p className="text-gray-500 mt-2">View the winners of all games in SMEC.</p>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gamesList.slice(0, visibleGames).map((game) => (
          <div
            key={game.id}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold text-gray-800">{game.name}</h2>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Winner:</span> {game.winner}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Year:</span> {game.year}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Score:</span> {game.score}
            </p>
            <button
              onClick={() => setSelectedGame(game)}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {visibleGames < gamesList.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleSeeMore}
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition duration-200"
          >
            See More
          </button>
        </div>
      )}

      {/* Modal for Game Details */}
      {selectedGame && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-6 z-50">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            {/* Game Details */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedGame.name} - Winner Details
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Winner Team/Player:</strong> {selectedGame.winner}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Details:</strong> {selectedGame.details}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Opponent:</strong> {selectedGame.opponent}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Score:</strong> {selectedGame.score}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Final Match Date:</strong> {selectedGame.finalDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserWinners;

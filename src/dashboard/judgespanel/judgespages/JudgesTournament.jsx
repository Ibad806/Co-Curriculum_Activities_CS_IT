import React, { useState } from "react";

const JudgesTournament = () => {
  // Sample data for tournaments
  const tournaments = [
    {
      id: 1,
      name: "PUBG Tournament",
      startDate: "01-01-2025",
      endDate: "15-01-2025",
      status: "Ongoing",
      teams: ["Team A", "Team B", "Team C", "Team D"],
      matches: [
        { matchId: 1, teams: "Team A vs Team B", status: "Completed", winner: "Team B" },
        { matchId: 2, teams: "Team C vs Team D", status: "Pending" },
      ],
    },
    {
      id: 2,
      name: "Valorant Championship",
      startDate: "05-01-2025",
      endDate: "20-01-2025",
      status: "Completed",
      teams: ["Team X", "Team Y", "Team Z", "Team W"],
      matches: [
        { matchId: 1, teams: "Team X vs Team Y", status: "Completed", winner: "Team Y" },
        { matchId: 2, teams: "Team Z vs Team W", status: "Completed", winner: "Team W" },
      ],
    },
  ];

  // State for handling tournament details view
  const [selectedTournament, setSelectedTournament] = useState(null);

  // Handle viewing tournament details
  const handleViewTournament = (tournament) => {
    setSelectedTournament(tournament);
  };

  // Handle closing tournament details
  const handleCloseDetails = () => {
    setSelectedTournament(null);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tournaments</h1>
        <p className="text-gray-500 mt-2">
          Manage and oversee the tournaments assigned to you.
        </p>
      </div>

      {/* Tournament List */}
      <div className="space-y-6">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold text-gray-800">{tournament.name}</h2>
            <p className="text-gray-600 mt-2">
              <strong>Start Date:</strong> {tournament.startDate}
            </p>
            <p className="text-gray-600">
              <strong>End Date:</strong> {tournament.endDate}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  tournament.status === "Ongoing"
                    ? "text-blue-500"
                    : "text-green-500"
                } font-medium`}
              >
                {tournament.status}
              </span>
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleViewTournament(tournament)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tournament Details Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-6 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={handleCloseDetails}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            {/* Tournament Details */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedTournament.name}
            </h2>
            <p className="text-gray-600">
              <strong>Start Date:</strong> {selectedTournament.startDate}
            </p>
            <p className="text-gray-600">
              <strong>End Date:</strong> {selectedTournament.endDate}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  selectedTournament.status === "Ongoing"
                    ? "text-blue-500"
                    : "text-green-500"
                } font-medium`}
              >
                {selectedTournament.status}
              </span>
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
              Matches
            </h3>
            <ul className="space-y-3">
              {selectedTournament.matches.map((match) => (
                <li
                  key={match.matchId}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <span>{match.teams}</span>
                  <span
                    className={`${
                      match.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    } font-medium`}
                  >
                    {match.status}
                  </span>
                </li>
              ))}
            </ul>

            {/* Declare Winner (for final match) */}
            {selectedTournament.status === "Ongoing" && (
              <div className="mt-6">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200">
                  Declare Final Winner
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgesTournament;

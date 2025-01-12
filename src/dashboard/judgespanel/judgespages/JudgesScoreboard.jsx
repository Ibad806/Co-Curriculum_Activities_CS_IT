import React from "react";

const JudgesScoreboard = () => {
  // Sample data for match results
  const matchResults = [
    {
      matchId: 1,
      teams: "Team A vs Team B",
      winner: "Team A",
      date: "10-01-2025",
    },
    {
      matchId: 2,
      teams: "Team C vs Team D",
      winner: "Team D",
      date: "11-01-2025",
    },
    {
      matchId: 3,
      teams: "Team E vs Team F",
      winner: "Team E",
      date: "12-01-2025",
    },
  ];

  // Sample data for tournament results
  const tournamentResults = [
    {
      tournamentName: "SMEC Championship",
      winner: "Team X",
      players: ["Player 1", "Player 2", "Player 3", "Player 4"],
      date: "15-01-2025",
    },
    {
      tournamentName: "Valorant Showdown",
      winner: "Team Y",
      players: ["Player A", "Player B", "Player C", "Player D"],
      date: "20-01-2025",
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Scoreboard/Results</h1>
        <p className="text-gray-500 mt-2">
          View match and tournament results below.
        </p>
      </div>

      {/* Match Results Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Match Results
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-4 text-left text-gray-600">Match ID</th>
              <th className="border-b-2 p-4 text-left text-gray-600">Teams</th>
              <th className="border-b-2 p-4 text-left text-gray-600">Winner</th>
              <th className="border-b-2 p-4 text-left text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {matchResults.map((result) => (
              <tr key={result.matchId}>
                <td className="border-b p-4 text-gray-800">{result.matchId}</td>
                <td className="border-b p-4 text-gray-800">{result.teams}</td>
                <td className="border-b p-4 font-bold text-green-600">
                  {result.winner}
                </td>
                <td className="border-b p-4 text-gray-800">{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tournament Results Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Tournament Results
        </h2>
        <div className="space-y-6">
          {tournamentResults.map((tournament, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {tournament.tournamentName}
                </h3>
                <p className="text-gray-600">
                  <strong>Winner:</strong> {tournament.winner}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {tournament.date}
                </p>
                <p className="text-gray-600">
                  <strong>Players:</strong>{" "}
                  {tournament.players.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JudgesScoreboard;

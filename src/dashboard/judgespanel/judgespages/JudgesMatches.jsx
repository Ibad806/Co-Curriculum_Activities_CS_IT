import React, { useState } from "react";

const JudgesMatches = () => {
  // Sample data for matches
  const matches = [
    {
      id: 1,
      teams: "Team A vs Team B",
      date: "10-01-2025",
      time: "3:00 PM",
      status: "Pending",
    },
    {
      id: 2,
      teams: "Team C vs Team D",
      date: "11-01-2025",
      time: "5:00 PM",
      status: "Completed",
      winner: "Team D",
    },
    {
      id: 3,
      teams: "Team E vs Team F",
      date: "12-01-2025",
      time: "4:00 PM",
      status: "Pending",
    },
  ];

  // State for handling the match details view
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedWinner, setSelectedWinner] = useState("");

  // Handle viewing match details
  const handleViewMatch = (match) => {
    setSelectedMatch(match);
    setSelectedWinner(""); // Reset winner selection
  };

  // Handle closing match details
  const handleCloseMatchDetails = () => {
    setSelectedMatch(null);
  };

  // Handle submitting the winner
  const handleSubmitWinner = () => {
    if (selectedWinner) {
      alert(`Winner submitted: ${selectedWinner}`);
      // Add logic to update match result in the database
      handleCloseMatchDetails();
    } else {
      alert("Please select a winner before submitting.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Matches</h1>
        <p className="text-gray-500 mt-2">
          Manage and oversee the matches assigned to you.
        </p>
      </div>

      {/* Matches List */}
      <div className="space-y-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center border-l-4"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {match.teams}
              </h2>
              <p className="text-gray-600">
                <strong>Match ID:</strong> {match.id}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {match.date}
              </p>
              <p className="text-gray-600">
                <strong>Time:</strong> {match.time}
              </p>
              <p className={`text-gray-600 ${match.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
                <strong>Status:</strong> {match.status}
              </p>
              {match.status === "Completed" && (
                <p className="text-gray-600">
                  <strong>Winner:</strong> {match.winner}
                </p>
              )}
            </div>
            <button
              onClick={() => handleViewMatch(match)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Match Details Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-6 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={handleCloseMatchDetails}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            {/* Match Details */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Match Details
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Match ID:</strong> {selectedMatch.id}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Teams:</strong> {selectedMatch.teams}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Date:</strong> {selectedMatch.date}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Time:</strong> {selectedMatch.time}
            </p>
            <p
              className={`text-gray-600 ${
                selectedMatch.status === "Completed"
                  ? "text-green-500"
                  : "text-yellow-500"
              } mb-2`}
            >
              <strong>Status:</strong> {selectedMatch.status}
            </p>

            {selectedMatch.status === "Pending" && (
              <>
                <div className="mt-4">
                  <label className="block text-gray-800 font-medium mb-2">
                    Select Winner:
                  </label>
                  <select
                    value={selectedWinner}
                    onChange={(e) => setSelectedWinner(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a team</option>
                    {selectedMatch.teams.split(" vs ").map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleSubmitWinner}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200 mt-4"
                >
                  Submit Winner
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgesMatches;

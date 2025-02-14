import React, { useState } from "react";

const AdminJudges = () => {
  // Mock data for demonstration
  const initialJudges = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", assignedTournaments: "SMEC 2025" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", assignedTournaments: "Valorant Championship" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", assignedTournaments: "FIFA 2025" },
  ];

  const [judges, setJudges] = useState(initialJudges);
  const [newJudgeName, setNewJudgeName] = useState("");
  const [newJudgeEmail, setNewJudgeEmail] = useState("");

  // Mock data for tournaments
  const tournaments = ["SMEC 2025", "Valorant Championship", "FIFA 2025", "Chess Tournament 2025"];

  // Function to add a new judge
  const addJudge = () => {
    const newJudge = {
      id: judges.length + 1,
      name: newJudgeName,
      email: newJudgeEmail,
      assignedTournaments: "",
    };
    setJudges([...judges, newJudge]);
    setNewJudgeName("");
    setNewJudgeEmail("");
  };

  // Function to assign a tournament to a judge
  const assignTournament = (judgeId, tournament) => {
    const updatedJudges = judges.map(judge =>
      judge.id === judgeId ? { ...judge, assignedTournaments: tournament } : judge
    );
    setJudges(updatedJudges);
  };

  // Function to toggle judge status
  const toggleJudgeStatus = (judgeId) => {
    const updatedJudges = judges.map(judge =>
      judge.id === judgeId ? { ...judge, status: judge.status === "Active" ? "Inactive" : "Active" } : judge
    );
    setJudges(updatedJudges);
  };

  // Function to remove a judge
  const removeJudge = (judgeId) => {
    const updatedJudges = judges.filter(judge => judge.id !== judgeId);
    setJudges(updatedJudges);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Judges Management</h1>
        <p className="text-gray-600 mt-2">
          Create and manage judges and their assigned tournaments.
        </p>
      </div>

      {/* Add New Judge */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Judge Name"
          value={newJudgeName}
          onChange={(e) => setNewJudgeName(e.target.value)}
          className="px-4 py-2 border rounded-lg flex-grow"
        />
        <input
          type="email"
          placeholder="Judge Email"
          value={newJudgeEmail}
          onChange={(e) => setNewJudgeEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg flex-grow"
        />
        <button
          onClick={addJudge}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Judge
        </button>
      </div>

      {/* Judges List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-4 font-bold text-gray-800">Name</th>
              <th className="pb-4 font-bold text-gray-800">Email</th>
              <th className="pb-4 font-bold text-gray-800">Assigned Tournaments</th>
              <th className="pb-4 font-bold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {judges.map(judge => (
              <tr key={judge.id} className="hover:bg-gray-100">
                <td className="py-2">{judge.name}</td>
                <td className="py-2">{judge.email}</td>
                <td className="py-2">
                  {judge.assignedTournaments || "None"}
                  <select
                    className="ml-2 bg-white border rounded"
                    onChange={(e) => assignTournament(judge.id, e.target.value)}
                    defaultValue={judge.assignedTournaments}
                  >
                    <option value="">Assign Tournament</option>
                    {tournaments.map(tournament => (
                      <option key={tournament} value={tournament}>{tournament}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2 flex space-x-2">
                  <button
                    onClick={() => toggleJudgeStatus(judge.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => removeJudge(judge.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Judges Found */}
        {judges.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No judges found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJudges;

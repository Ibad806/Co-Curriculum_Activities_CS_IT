import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaGamepad, FaEdit, FaTrash, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';

const JudgesManagement = ({ games: propGames }) => {
  // Dummy games data (fallback if no games are passed)
  const dummyGames = [
    { id: 1, title: "PUBG Tournament" },
    { id: 2, title: "Free Fire Championship" },
    { id: 3, title: "Chess Masters" },
    { id: 4, title: "FIFA 23 Showdown" },
    { id: 5, title: "Call of Duty: Mobile" },
    { id: 6, title: "Valorant Clash" },
    { id: 7, title: "Clash Royale Arena" },
    { id: 8, title: "Minecraft Build Battle" },
    { id: 9, title: "Rocket League Rumble" },
    { id: 10, title: "Among Us Challenge" }
  ];

  // Use propGames if available, otherwise use dummyGames
  const games = propGames || dummyGames;

  const [judges, setJudges] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    assignedGames: []
  });

  // Initialize with sample judges (remove in production)
  useEffect(() => {
    setJudges([
      {
        id: 1,
        name: "John Smith",
        email: "john@smec.com",
        contact: "+92 300 1234567",
        assignedGames: [1, 3]
      }
    ]);
  }, []);

  // Get assigned/unassigned games
  const getGameLists = () => {
    const assigned = games.filter(g => formData.assignedGames.includes(g.id));
    const unassigned = games.filter(g => !formData.assignedGames.includes(g.id));
    return { assigned, unassigned };
  };

  // Handle game assignment
  const handleGameAssignment = (gameId, assign) => {
    const newAssignedGames = assign
      ? [...formData.assignedGames, gameId]
      : formData.assignedGames.filter(id => id !== gameId);
    
    setFormData({ ...formData, assignedGames: newAssignedGames });
  };

  // Form submission handlers
  const handleCreateJudge = (e) => {
    e.preventDefault();
    const newJudge = {
      id: Date.now(),
      ...formData
    };
    setJudges([...judges, newJudge]);
    closeModals();
  };

  const handleUpdateJudge = (e) => {
    e.preventDefault();
    setJudges(judges.map(j => j.id === selectedJudge.id ? { ...j, ...formData } : j));
    closeModals();
  };

  const deleteJudge = (id) => {
    setJudges(judges.filter(j => j.id !== id));
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setFormData({ name: '', email: '', contact: '', assignedGames: [] });
  };

  const { assigned, unassigned } = getGameLists();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Judges Management</h1>
          <p className="text-gray-500 mt-1">
            Total Games: {games.length} | Total Judges: {judges.length}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center"
        >
          <FaUserPlus className="mr-2" /> Add New Judge
        </button>
      </div>

      {/* Judges Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Judge</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Assigned Games</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {judges.map(judge => (
              <tr key={judge.id}>
                <td className="px-6 py-4 font-medium">{judge.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-blue-500" />
                    {judge.email}
                  </div>
                  <div className="flex items-center mt-1">
                    <FaPhone className="mr-2 text-green-500" />
                    {judge.contact}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {judge.assignedGames.map(gameId => {
                    const game = games.find(g => g.id === gameId);
                    return (
                      <div key={gameId} className="bg-gray-100 px-2 py-1 rounded mr-2 mb-2 inline-block">
                        <FaGamepad className="mr-1 inline text-purple-500" />
                        {game?.title || 'Unknown Game'}
                      </div>
                    );
                  })}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedJudge(judge);
                      setFormData(judge);
                      setShowEditModal(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteJudge(judge.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Judge Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {showCreateModal ? 'Create New Judge' : 'Edit Judge'}
              </h2>
              <button onClick={closeModals} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={showCreateModal ? handleCreateJudge : handleUpdateJudge}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                    <input
                      type="tel"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Game Assignment Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Game Assignments</h3>
                  
                  {/* Assigned Games */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 text-green-600">
                      Assigned Games ({assigned.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {assigned.map(game => (
                        <label
                          key={game.id}
                          className="flex items-center p-2 bg-green-50 rounded border border-green-100"
                        >
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => handleGameAssignment(game.id, false)}
                            className="mr-2"
                          />
                          <FaGamepad className="mr-2 text-green-500" />
                          {game.title}
                        </label>
                      ))}
                      {assigned.length === 0 && (
                        <p className="text-gray-500 text-sm col-span-2">
                          No games assigned yet
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Unassigned Games */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-600">
                      Available Games ({unassigned.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {unassigned.map(game => (
                        <label
                          key={game.id}
                          className="flex items-center p-2 hover:bg-gray-50 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => handleGameAssignment(game.id, true)}
                            className="mr-2"
                          />
                          <FaGamepad className="mr-2 text-gray-500" />
                          {game.title}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    {showCreateModal ? 'Create Judge' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgesManagement;
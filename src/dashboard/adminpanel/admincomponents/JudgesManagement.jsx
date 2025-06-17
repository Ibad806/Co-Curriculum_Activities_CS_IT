import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FaUserPlus,
  FaGamepad,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaTimes,
} from "react-icons/fa";
import { AppRoutes } from "../../../constant/constant";

const JudgesManagement = () => {
  const [judges, setJudges] = useState([]);
  const [games, setGames] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    assignedGames: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [judgesRes, gamesRes] = await Promise.all([
          axios.get(AppRoutes.judge),
          axios.get(AppRoutes.creategame),
        ]);

        setJudges(judgesRes.data);
        setGames(gamesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleGameAssignment = (gameId) => {
    setFormData((prev) => ({
      ...prev,
      assignedGames: prev.assignedGames?.includes(gameId) ? [] : [gameId],
    }));
  };

  const handleCreateJudge = async (e) => {
    e.preventDefault();
    try {
      // Send only the necessary data to create judge
      const res = await axios.post(AppRoutes.judge, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setJudges([...judges, res.data.judge]);
      closeModals();
    } catch (error) {
      console.error("Error creating judge:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const handleUpdateJudge = async (e) => {
  e.preventDefault();
  try {
    const dataToSend = {
      ...formData,
      assignedGames: formData.assignedGames,
    };

    await axios.put(`${AppRoutes.judge}/${selectedJudge._id}`, dataToSend);
    
    // Refresh judges list after update
    const judgesRes = await axios.get(AppRoutes.judge);
    setJudges(judgesRes.data);
    
    closeModals();
  } catch (err) {
    console.error("Error updating judge:", err);
  }
};
  const handleEditJudge = (judge) => {
    setSelectedJudge(judge);

    // Safely get assigned game IDs
    const assignedGameIds = (judge.assignedGames || []).map((game) =>
      typeof game === "string" ? game : game._id
    );

    setFormData({
      name: judge.name,
      email: judge.email,
      contact: judge.contact,
      assignedGames: assignedGameIds,
    });

    setShowEditModal(true);
  };

  const deleteJudge = async (id) => {
    try {
      await axios.delete(`${AppRoutes.judge}/${id}`);
      setJudges(judges.filter((j) => j._id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting judge:", error);
    }
  };

  const confirmDelete = () => {
    if (selectedJudge) {
      deleteJudge(selectedJudge._id);
    }
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setFormData({ name: "", email: "", contact: "", assignedGames: [] });
    setSelectedJudge(null);
  };

  const getGameLists = () => {
  const assigned = games.filter((g) =>
  (formData.assignedGames || []).includes(g._id)
);


    const unassigned = games.filter(
  (g) => !(formData.assignedGames || []).includes(g._id)
);

    return { assigned, unassigned };
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
              <th className="px-6 py-3 text-left text-sm font-medium">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Assigned Game
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {judges.filter(Boolean).map((judge) => { // Add this filter
    const assignedGameIds = judge.assignedGames || [];
              const firstGameId = assignedGameIds[0]; // Get first ID safely
              const assignedGame = games.find((g) => g._id === firstGameId);
              return (
                <tr key={judge._id}>
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
                    {assignedGame ? (
                      <div className="bg-gray-100 px-2 py-1 rounded inline-block">
                        <FaGamepad className="mr-1 inline text-purple-500" />
                        {assignedGame.title}
                      </div>
                    ) : (
                      <span className="text-gray-400">Not assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditJudge(judge)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedJudge(judge);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Judge Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {showCreateModal ? "Create New Judge" : "Edit Judge"}
              </h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={showCreateModal ? handleCreateJudge : handleUpdateJudge}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={showEditModal}
                  />
                  {showCreateModal && (
                    <p className="text-sm text-gray-500 mt-1">
                      Judge will use this email to login with password: 12345678
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Game Assignment
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 text-green-600">
                      Currently Assigned
                    </h4>
                    {assigned.length > 0 ? (
                      <div className="flex items-center p-2 bg-green-50 rounded border border-green-100">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => handleGameAssignment(assigned[0]._id)}
                          className="mr-2"
                        />
                        <FaGamepad className="mr-2 text-green-500" />
                        {assigned[0].title}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No game currently assigned
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-600">
                      Available Games ({unassigned.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {unassigned.map((game) => (
                        <div
                          key={game._id}
                          className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => handleGameAssignment(game._id)}
                        >
                          <input
                            type="radio"
                            name="gameAssignment"
                            checked={false}
                            onChange={() => handleGameAssignment(game._id)}
                            className="mr-2"
                          />
                          <FaGamepad className="mr-2 text-gray-500" />
                          {game.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

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
                    {showCreateModal ? "Create Judge" : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJudge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Delete Judge</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete judge:
              <br />
              <strong>{selectedJudge.name}</strong>?
              {selectedJudge?.assignedGames?.length > 0 && (

                <>
                  <br />
                  <span className="text-red-500">
                    This will also remove them from the assigned game.
                  </span>
                </>
              )}
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgesManagement;

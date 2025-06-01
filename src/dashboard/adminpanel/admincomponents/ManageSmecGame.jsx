import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaEdit, FaTrash, FaUsers, FaEye, FaTimes } from "react-icons/fa";
import axios from "axios";
import { AppRoutes } from "../../../constant/constant";
import { notification } from "antd";

const ManageSmecGame = () => {
  // State management
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [leads, setLeads] = useState([]);
  const [coLeads, setCoLeads] = useState([]);
  
  // Filters
  const [filters, setFilters] = useState({
    sortBy: "date",
  });

  // Fetch all games
  const fetchGames = async () => {
    try {
      setLoading(true);
      const res = await axios.get(AppRoutes.creategames);
      setGames(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching games:", err);
      setError("Failed to load games. Please try again.");
      notification.error({
        message: "Error",
        description: "Failed to load games",
        placement: "topRight"
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories and users for dropdowns
  const fetchDropdownData = async () => {
    try {
      // Fetch categories
      const categoriesRes = await axios.get(AppRoutes.category);
      setCategories(categoriesRes.data);
      
      // Fetch users (leads and co-leads)
      const usersRes = await axios.get(AppRoutes.usersaccepted);
      if (usersRes.data.success) {
        setLeads(usersRes.data.data.lead);
        setCoLeads(usersRes.data.data.coLead);
      }
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
      notification.error({
        message: "Error",
        description: "Failed to load dropdown options",
        placement: "topRight"
      });
    }
  };

  useEffect(() => {
    fetchGames();
    fetchDropdownData();
  }, []);

  // Filter and sort games
  const filteredGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (filters.sortBy === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (filters.sortBy === "players") {
        return b.player - a.player;
      }
      return 0;
    });

  // Action handlers
  const handleEdit = (game) => {
    setSelectedGame({
      ...game,
      category: game.category?._id || game.category,
      lead: game.lead?._id || game.lead,
      coLead: game.coLead?._id || game.coLead
    });
    setShowEditModal(true);
  };

  const handleDelete = (game) => {
    setSelectedGame(game);
    setShowDeleteModal(true);
  };

  const handleView = (game) => {
    setSelectedGame(game);
    setShowViewModal(true);
  };

  // Delete a game
  const confirmDelete = async () => {
    try {
      await axios.delete(`${AppRoutes.creategame}/${selectedGame._id}`);
      notification.success({
        message: "Success",
        description: "Game deleted successfully",
        placement: "topRight"
      });
      fetchGames(); // Refresh the list
    } catch (err) {
      console.error("Error deleting game:", err);
      notification.error({
        message: "Error",
        description: "Failed to delete game",
        placement: "topRight"
      });
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Update a game
  const saveChanges = async () => {
    try {
      const { _id, ...updateData } = selectedGame;
      await axios.put(`${AppRoutes.creategame}/${_id}`, updateData);
      notification.success({
        message: "Success",
        description: "Game updated successfully",
        placement: "topRight"
      });
      fetchGames(); // Refresh the list
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating game:", err);
      notification.error({
        message: "Error",
        description: "Failed to update game",
        placement: "topRight"
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={fetchGames}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Manage SMEC Games</h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
          <span className="text-gray-500">Sort by:</span>
          <select
            className="bg-transparent p-1"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="date">Newest First</option>
            <option value="players">Most Players</option>
          </select>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Game Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Max Players</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredGames.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No games found
                </td>
              </tr>
            ) : (
              filteredGames.map((game) => (
                <tr key={game._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{game.title}</td>
                  <td className="px-6 py-4">
                    {game.category?.title || "No category"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-gray-400" />
                      {game.player}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(game.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleEdit(game)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(game)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleView(game)}
                        className="text-purple-500 hover:text-purple-700"
                        title="View Details"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Game Modal */}
      {showEditModal && selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Game</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              saveChanges();
            }}>
              <div>
                <label className="block text-sm font-medium mb-1">Game Title</label>
                <input
                  type="text"
                  value={selectedGame.title || ""}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={selectedGame.category || ""}
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, category: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedGame.date || ""}
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, date: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    value={selectedGame.time || ""}
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, time: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={selectedGame.price || ""}
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, price: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Lead</label>
                  <select
                    value={selectedGame.lead || ""}
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, lead: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Lead</option>
                    {leads.map((lead) => (
                      <option key={lead._id} value={lead._id}>
                        {lead.Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Co-Lead</label>
                  <select
                    value={selectedGame.coLead || ""}
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, coLead: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Co-Lead</option>
                    {coLeads.map((coLead) => (
                      <option key={coLead._id} value={coLead._id}>
                        {coLead.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Venue</label>
                <input
                  type="text"
                  value={selectedGame.venue || ""}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, venue: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Max Players</label>
                <input
                  type="number"
                  min="1"
                  value={selectedGame.player || ""}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, player: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={selectedGame.description || ""}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, description: e.target.value })
                  }
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Delete Game</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete:
              <br />
              <strong>{selectedGame.title}</strong>?
              <br />
              <span className="text-red-500">This action cannot be undone.</span>
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

      {/* View Game Modal */}
      {showViewModal && selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Game Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Game Title</label>
                <p className="p-3 bg-gray-50 rounded font-medium">{selectedGame.title}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <p className="p-3 bg-gray-50 rounded">
                    {selectedGame.category?.title || "No category"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <p className="p-3 bg-gray-50 rounded">
                    {formatDate(selectedGame.date)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <p className="p-3 bg-gray-50 rounded">{selectedGame.time}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <p className="p-3 bg-gray-50 rounded">${selectedGame.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Lead</label>
                  <p className="p-3 bg-gray-50 rounded">
                    {selectedGame.lead?.Name || "No lead selected"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Co-Lead</label>
                  <p className="p-3 bg-gray-50 rounded">
                    {selectedGame.coLead?.Name || "No co-lead selected"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Venue</label>
                <p className="p-3 bg-gray-50 rounded">{selectedGame.venue}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Max Player</label>
                <p className="p-3 bg-gray-50 rounded">{selectedGame.player}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <p className="p-3 bg-gray-50 rounded min-h-[100px]">{selectedGame.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Banner Image</label>
                {selectedGame.gameImageUrl ? (
                  <img
                    src={selectedGame.gameImageUrl}
                    alt="Game Banner"
                    className="w-full max-h-60 object-contain rounded border"
                  />
                ) : (
                  <div className="p-10 bg-gray-100 rounded text-center text-gray-500">
                    No banner image available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSmecGame;
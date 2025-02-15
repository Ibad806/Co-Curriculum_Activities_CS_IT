import React, { useState } from "react";
import { FaSearch, FaFilter, FaEdit, FaTrash, FaUsers, FaEye, FaTimes } from "react-icons/fa";

const ManageSmecGame = () => {
  // Sample games data
  const [games, setGames] = useState([
    {
      id: 1,
      title: "PUBG Tournament",
      category: "Battle Royale",
      participants: 85,
      status: "Active",
      registrationEnd: "2024-04-15",
      description: "Annual PUBG championship with cash prizes",
      banner: "pubg-banner.jpg",
    },
    {
      id: 2,
      title: "Free Fire Championship",
      category: "E-Sports",
      participants: 120,
      status: "Draft",
      registrationEnd: "2024-05-01",
      description: "Free Fire tournament for college students",
      banner: "freefire-banner.jpg",
    },
  ]);

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "All",
    sortBy: "date",
  });

  // Filter and sort games
  const filteredGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.status === "All" || game.status === filters.status)
    )
    .sort((a, b) => {
      if (filters.sortBy === "date") return new Date(a.registrationEnd) - new Date(b.registrationEnd);
      if (filters.sortBy === "participants") return b.participants - a.participants;
      return 0;
    });

  // Action handlers
  const handleEdit = (game) => {
    setSelectedGame(game);
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

  const confirmDelete = () => {
    setGames(games.filter((g) => g.id !== selectedGame.id));
    setShowDeleteModal(false);
  };

  const saveChanges = (updatedGame) => {
    setGames(games.map((g) => (g.id === updatedGame.id ? updatedGame : g)));
    setShowEditModal(false);
  };

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
          <FaFilter className="text-gray-500" />
          <select
            className="bg-transparent p-1"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
          <span className="text-gray-500">Sort by:</span>
          <select
            className="bg-transparent p-1"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="date">Registration Date</option>
            <option value="participants">Participants</option>
          </select>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Game Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Participants</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredGames.map((game) => (
              <tr key={game.id}>
                <td className="px-6 py-4 font-medium">{game.title}</td>
                <td className="px-6 py-4">{game.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaUsers className="mr-2 text-gray-400" />
                    {game.participants}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      game.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : game.status === "Draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {game.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleEdit(game)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(game)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleView(game)}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Game Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Game</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Game Title</label>
                <input
                  type="text"
                  value={selectedGame?.title || ""}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={selectedGame?.category || ""}
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, category: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="Battle Royale">Battle Royale</option>
                    <option value="E-Sports">E-Sports</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={selectedGame?.status || ""}
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, status: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={selectedGame?.description || ""}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, description: e.target.value })
                  }
                  className="w-full p-2 border rounded h-32"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveChanges(selectedGame)}
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
      {showDeleteModal && (
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
              <strong>{selectedGame?.title}</strong>?
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
      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
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
                <p className="p-2 bg-gray-50 rounded">{selectedGame?.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <p className="p-2 bg-gray-50 rounded">{selectedGame?.category}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <p className="p-2 bg-gray-50 rounded">{selectedGame?.status}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <p className="p-2 bg-gray-50 rounded h-32">{selectedGame?.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Banner Preview</label>
                <img
                  src={selectedGame?.banner}
                  alt="Game Banner"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSmecGame;
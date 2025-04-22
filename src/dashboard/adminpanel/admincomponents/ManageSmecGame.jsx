import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaUser,
  FaUserFriends,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import axios from "axios";
import { AppRoutes } from "../../../constant/constant";

const ManageSmecGame = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch all games
  const fetchGames = async () => {
    try {
      const res = await axios.get(AppRoutes.creategame);
      setGames(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching games:", err);
      setLoading(false);
    }
  };

// In your fetchDropdownData function, modify it to properly extract lead/co-lead info
const fetchDropdownData = async () => {
  try {
    const [categoriesRes, usersRes] = await Promise.all([
      axios.get(AppRoutes.category),
      axios.get(AppRoutes.usersaccepted)
    ]);
    
    // Store categories with their lead/co-lead info
    setCategories(categoriesRes.data);
    
    // For users, combine leads and co-leads
    setUsers(usersRes.data.data.lead.concat(usersRes.data.data.coLead));
  } catch (err) {
    console.error("Error fetching dropdown data:", err);
  }
};

// Add this helper function to get lead/co-lead info from the selected category
const getCategoryLeaderInfo = (game, type) => {
  if (!game?.category?._id) return null;
  
  // Find the selected category
  const category = categories.find(cat => cat._id === game.category._id);
  if (!category) return null;
  
  // Return either lead or co-lead info based on type
  return type === 'lead' ? category.lead : category.coLead;
};
  useEffect(() => {
    fetchGames();
    fetchDropdownData();
  }, []);

  // Filter games
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle edit
  const handleEdit = (game) => {
    setSelectedGame(game);
    setShowEditModal(true);
  };

  // Handle delete
  const handleDelete = (game) => {
    setSelectedGame(game);
    setShowDeleteModal(true);
  };

  // Handle view
  const handleView = (game) => {
    setSelectedGame(game);
    setShowViewModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await axios.delete(`${AppRoutes.creategame}/${selectedGame._id}`);
      setGames(games.filter((g) => g._id !== selectedGame._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting game:", err);
    }
  };

  // Save changes
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${AppRoutes.creategame}/${selectedGame._id}`,
        selectedGame
      );
      setGames(games.map((g) => (g._id === selectedGame._id ? res.data : g)));
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating game:", err);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

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

      {/* Games Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Game Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredGames.map((game) => (
              <tr key={game._id}>
                <td className="px-6 py-4 font-medium">{game.title}</td>
                <td className="px-6 py-4">
                  {game.category?.title || "No Category"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    {formatDate(game.date)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaMoneyBillWave className="mr-2 text-gray-400" />
                    {game.price}
                  </div>
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
                      title="View"
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

            <form onSubmit={saveChanges} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Game Title
                  </label>
                  <input
                    type="text"
                    value={selectedGame.title || ""}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    value={selectedGame.category?._id || ""}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        category: e.target.value,
                      })
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
                    value={
                      selectedGame.date ? selectedGame.date.split("T")[0] : ""
                    }
                    onChange={(e) =>
                      setSelectedGame({ ...selectedGame, date: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

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
            <label className="block text-sm font-medium mb-1">Lead</label>
            <div className="p-2 border rounded bg-gray-50">
              {getCategoryLeaderInfo(selectedGame, "lead") ? (
                <>
                  <p className="font-medium">
                    {getCategoryLeaderInfo(selectedGame, "lead").Name}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FaPhone className="mr-1" />
                    {getCategoryLeaderInfo(selectedGame, "lead").ContactNumber || "No contact"}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No lead assigned</p>
              )}
            </div>
          </div>

          {/* Co-Lead Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Co-Lead</label>
            <div className="p-2 border rounded bg-gray-50">
              {getCategoryLeaderInfo(selectedGame, "coLead") ? (
                <>
                  <p className="font-medium">
                    {getCategoryLeaderInfo(selectedGame, "coLead").Name}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FaPhone className="mr-1" />
                    {getCategoryLeaderInfo(selectedGame, "coLead").ContactNumber || "No contact"}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No co-lead assigned</p>
              )}
            </div>
          </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={selectedGame.price || ""}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        price: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Players
                  </label>
                  <input
                    type="number"
                    value={selectedGame.player || ""}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        player: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
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
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={selectedGame.description || ""}
                  onChange={(e) =>
                    setSelectedGame({
                      ...selectedGame,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
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
              <div className="mb-6">
                {selectedGame.gameImageUrl && (
                  <img
                    src={selectedGame.gameImageUrl}
                    alt="Game Banner"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Lead Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center">
                    <FaUser className="mr-2" /> Lead
                  </h3>
                  {getCategoryLeaderInfo(selectedGame, "lead") ? (
                    <>
                      <p>{getCategoryLeaderInfo(selectedGame, "lead").Name}</p>
                      <p className="text-sm text-gray-500">
                        {getCategoryLeaderInfo(selectedGame, "lead")
                          .ContactNumber || "No contact"}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">No lead assigned</p>
                  )}
                </div>

                {/* Co-Lead Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center">
                    <FaUserFriends className="mr-2" /> Co-Lead
                  </h3>
                  {getCategoryLeaderInfo(selectedGame, "coLead") ? (
                    <>
                      <p>
                        {getCategoryLeaderInfo(selectedGame, "coLead").Name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {getCategoryLeaderInfo(selectedGame, "coLead")
                          .ContactNumber || "No contact"}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">No co-lead assigned</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2" /> Date
                  </h3>
                  <p>{formatDate(selectedGame.date)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center">
                    <FaMoneyBillWave className="mr-2" /> Price
                  </h3>
                  <p>{selectedGame.price}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center">
                    <FaUsers className="mr-2" /> Max Players
                  </h3>
                  <p>{selectedGame.player}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Venue
                </h3>
                <p>{selectedGame.venue}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Description</h3>
                <p>{selectedGame.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSmecGame;

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
  FaPlus,
  FaGamepad,
  FaUpload,
  FaImage
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  // Form state for add game
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    time: "",
    price: "",
    player: "",
    venue: "",
    bannerImage: null,
    bannerImagePreview: ""
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // Fetch dropdown data
  const fetchDropdownData = async () => {
    try {
      const [categoriesRes, usersRes] = await Promise.all([
        axios.get(AppRoutes.category),
        axios.get(AppRoutes.usersaccepted)
      ]);
      
      setCategories(categoriesRes.data);
      setUsers(usersRes.data.data.lead.concat(usersRes.data.data.coLead));
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
    }
  };

  // Get category leader info
  const getCategoryLeaderInfo = (game, type) => {
    if (!game?.category?._id) return null;
    const category = categories.find(cat => cat._id === game.category._id);
    if (!category) return null;
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

  // Handle category change for add form
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const category = categories.find(cat => cat._id === selectedCategoryId);
    setFormData({...formData, category: selectedCategoryId});
    setSelectedCategory(category);
  };

  // Handle banner image change for add form
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        bannerImage: file,
        bannerImagePreview: URL.createObjectURL(file)
      });
    }
  };

  // Remove banner image for add form
  const removeBannerImage = () => {
    setFormData({
      ...formData,
      bannerImage: null,
      bannerImagePreview: ""
    });
  };

  // Handle form input changes for add form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle create game submission
  const handleCreateGame = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      alert("Please select a category first");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);
    
    if (selectedCategory.lead) {
      formDataToSend.append("lead", selectedCategory.lead._id);
    }
    if (selectedCategory.coLead) {
      formDataToSend.append("coLead", selectedCategory.coLead._id);
    }
    
    formDataToSend.append("price", formData.price);
    formDataToSend.append("player", formData.player);
    formDataToSend.append("venue", formData.venue);

    if (formData.bannerImage) {
      formDataToSend.append("bannerImage", formData.bannerImage);
    }

    try {
      const response = await axios.post(AppRoutes.creategame, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Game created:", response.data);
      alert("Game created successfully!");
      setShowAddModal(false);
      setFormData({
        title: "",
        category: "",
        description: "",
        date: "",
        time: "",
        price: "",
        player: "",
        venue: "",
        bannerImage: null,
        bannerImagePreview: ""
      });
      setSelectedCategory(null);
      fetchGames(); // Refresh the games list
    } catch (error) {
      console.error(
        "Error creating game:",
        error.response?.data || error.message
      );
      alert("Failed to create game. Please try again.");
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
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> Add Game
          </button>
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

      {/* Add Game Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <FaGamepad className="mr-2 text-purple-500" />
                Create New Game Event
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({
                    title: "",
                    category: "",
                    description: "",
                    date: "",
                    time: "",
                    price: "",
                    player: "",
                    venue: "",
                    bannerImage: null,
                    bannerImagePreview: ""
                  });
                  setSelectedCategory(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateGame} className="space-y-6">
              {/* Game Details */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FaGamepad className="mr-2 text-gray-500" />
                  Game Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Game Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="w-full p-3 border rounded-lg"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="E.g., PUBG Tournament"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Game Category
                    </label>
                    <select
                      className="w-full p-3 border rounded-lg"
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
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
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="w-full p-3 border rounded-lg"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input
                      type="time"
                      name="time"
                      className="w-full p-3 border rounded-lg"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full p-3 border rounded-lg"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Write a brief description about the game"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      className="w-full p-3 border rounded-lg"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Enter venue address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <input
                      type="text"
                      name="price"
                      className="w-full p-3 border rounded-lg"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price for participation"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Players</label>
                    <input
                      type="number"
                      name="player"
                      className="w-full p-3 border rounded-lg"
                      value={formData.player}
                      onChange={handleInputChange}
                      placeholder="Enter max number of players"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Display selected category's lead and co-lead */}
              {selectedCategory && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <FaGamepad className="mr-2 text-gray-500" />
                    Category Leaders
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Lead</label>
                      <div className="p-3 border rounded-lg bg-gray-50">
                        {selectedCategory.lead ? (
                          <>
                            <p className="font-medium">{selectedCategory.lead.Name}</p>
                            <p className="text-sm text-gray-600">
                              {selectedCategory.lead.ContactNumber || "No contact number"}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-500">No lead assigned</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Co-Lead</label>
                      <div className="p-3 border rounded-lg bg-gray-50">
                        {selectedCategory.coLead ? (
                          <>
                            <p className="font-medium">{selectedCategory.coLead.Name}</p>
                            <p className="text-sm text-gray-600">
                              {selectedCategory.coLead.ContactNumber || "No contact number"}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-500">No co-lead assigned</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Banner Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  {formData.bannerImagePreview ? (
                    <div className="relative">
                      <img
                        src={formData.bannerImagePreview}
                        alt="Banner Preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeBannerImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <FaImage className="text-gray-400 text-4xl mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Click to upload banner image
                      </p>
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleBannerImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                        >
                          <FaUpload className="mr-2" /> Browse
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({
                      title: "",
                      category: "",
                      description: "",
                      date: "",
                      time: "",
                      price: "",
                      player: "",
                      venue: "",
                      bannerImage: null,
                      bannerImagePreview: ""
                    });
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Create Game Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
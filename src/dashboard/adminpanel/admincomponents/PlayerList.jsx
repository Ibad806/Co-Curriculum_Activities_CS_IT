import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constant/constant";
import { toast } from "react-toastify";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [file, setFile] = useState(null);
  
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    cnic: "",
    phone: "",
    email: "",
    ticketPrice: "",
    category: "",
    game: ""
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, gamesRes] = await Promise.all([
          axios.get(`${BASE_URL}category/categories`),
          axios.get(`${BASE_URL}creategame/creategame`)
        ]);
        
        setCategories(catsRes.data);
        setGames(gamesRes.data);
        
        if (catsRes.data.length > 0) {
          setSelectedCategory(catsRes.data[0]._id);
          // Filter games for the first category
          const gamesForCategory = gamesRes.data.filter(
            game => game.category?._id === catsRes.data[0]._id
          );
          setFilteredGames(gamesForCategory);
          
          if (gamesForCategory.length > 0) {
            setSelectedGame(gamesForCategory[0]._id);
          }
        }
        
      } catch (err) {
        toast.error("Failed to load data: " + err.message);
      }
    };
    
    fetchData();
  }, []);

  // Update filtered games when category changes
  useEffect(() => {
    if (selectedCategory && games.length > 0) {
      const gamesForCategory = games.filter(
        game => game.category?._id === selectedCategory
      );
      setFilteredGames(gamesForCategory);
      
      if (gamesForCategory.length > 0) {
        setSelectedGame(gamesForCategory[0]._id);
      } else {
        setSelectedGame("");
      }
    }
  }, [selectedCategory, games]);

  // Fetch players when filters change
  useEffect(() => {
    const fetchPlayers = async () => {
      if (!selectedCategory || !selectedGame) return;
      
      try {
        const res = await axios.get(`${BASE_URL}player`, {
          params: { category: selectedCategory, game: selectedGame }
        });
        setPlayers(res.data);
      } catch (err) {
        toast.error("Failed to load players: " + err.message);
      }
    };
    
    fetchPlayers();
  }, [selectedCategory, selectedGame]);

  const handleInputChange = (e) => {
    setNewPlayer({
      ...newPlayer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}player`, {
        ...newPlayer,
        category: selectedCategory,
        game: selectedGame
      });
      
      toast.success("Player added successfully");
      setNewPlayer({
        name: "",
        cnic: "",
        phone: "",
        email: "",
        ticketPrice: ""
      });
      
      // Refresh player list
      const res = await axios.get(`${BASE_URL}player`, {
        params: { category: selectedCategory, game: selectedGame }
      });
      setPlayers(res.data);
      
    } catch (err) {
      toast.error("Error adding player: " + err.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      toast.warning("Please select a file first");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      await axios.post(`${BASE_URL}player/import`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      toast.success("Players imported successfully");
      setFile(null);
      
      // Refresh player list
      const res = await axios.get(`${BASE_URL}player`, {
        params: { category: selectedCategory, game: selectedGame }
      });
      setPlayers(res.data);
      
    } catch (err) {
      toast.error("Import failed: " + err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Player Management</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter Players</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Game
            </label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={filteredGames.length === 0}
            >
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <option key={game._id} value={game._id}>
                    {game.title}
                  </option>
                ))
              ) : (
                <option value="">No games available</option>
              )}
            </select>
          </div>
        </div>
      </div>
      
      {/* Add Player Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Player</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={newPlayer.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CNIC *
            </label>
            <input
              type="text"
              name="cnic"
              value={newPlayer.cnic}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={newPlayer.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={newPlayer.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ticket Price (PKR) *
            </label>
            <input
              type="number"
              name="ticketPrice"
              value={newPlayer.ticketPrice}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              disabled={!selectedGame}
            >
              Add Player
            </button>
          </div>
        </form>
      </div>
      
      {/* Import Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Import Players</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="text-xs text-gray-500 mt-2">
              CSV format: name,cnic,phone,email,ticketPrice,category,game
            </p>
          </div>
          <button
            onClick={handleImport}
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
          >
            Import CSV
          </button>
        </div>
      </div>
      
      {/* Players Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-6">Players List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNIC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.length > 0 ? (
                players.map((player) => (
                  <tr key={player._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.cnic}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.email || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PKR {player.ticketPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {player.category?.title || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {player.game?.title || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    {selectedGame 
                      ? "No players found for the selected category/game" 
                      : "Please select a category and game"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
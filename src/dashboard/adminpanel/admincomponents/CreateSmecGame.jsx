import React, { useState } from 'react';
import { FaGamepad, FaUpload, FaUsers, FaCalendarAlt, FaUserTie, FaMoneyBill, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';

const CreateSmecGame = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [gameImageUrl, setGameImageUrl] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lead, setLead] = useState('');
  const [coLead, setCoLead] = useState('');
  const [price, setPrice] = useState('');
  const [player, setPlayer] = useState('');
  const [venue, setVenue] = useState('');

  const gameCategories = [
    "E-Games",
    "Strategy Games",
    "Sports Simulation",
    "Battle Royale",
    "MOBA",
    "Card Games"
  ];

  const handleCreateGame = async (e) => {
    e.preventDefault();

    const gameData = {
      title,
      category,
      description,
      gameImageUrl,
      date,
      time,
      lead,
      coLead,
      price,
      player,
      venue
    };

    try {
      const response = await axios.post(AppRoutes.creategame, gameData);
      console.log('Game created:', response.data);
      alert('Game created successfully!');
      // Reset form
      setTitle('');
      setCategory('');
      setDescription('');
      setGameImageUrl('');
      setDate('');
      setTime('');
      setLead('');
      setCoLead('');
      setPrice('');
      setPlayer('');
      setVenue('');
    } catch (error) {
      console.error('Error creating game:', error.response?.data || error.message);
      alert('Failed to create game. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <FaGamepad className="mr-2 text-purple-500" />
        Create New Game Event
      </h1>

      <form onSubmit={handleCreateGame} className="space-y-8">
        {/* Game Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FaGamepad className="mr-2 text-gray-500" />
            Game Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Game Title</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., PUBG Tournament"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Game Category</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {gameCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <input
                type="time"
                className="w-full p-3 border rounded-lg"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lead</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                placeholder="Enter lead ID or name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Co-Lead</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={coLead}
                onChange={(e) => setCoLead(e.target.value)}
                placeholder="Enter co-lead ID or name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="E.g., 50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Players</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
                placeholder="E.g., 100"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Venue</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="E.g., Main Auditorium"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Game Description</label>
            <textarea
              className="w-full p-3 border rounded-lg h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the game rules, format, and special requirements..."
              required
            />
          </div>
        </div>

        {/* Game Media */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FaUpload className="mr-2 text-gray-500" />
            Game Media
          </h2>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={gameImageUrl}
              onChange={(e) => setGameImageUrl(e.target.value)}
              placeholder="Paste image URL here"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Create Game Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSmecGame;
``
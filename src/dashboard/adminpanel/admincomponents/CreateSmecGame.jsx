import React from 'react';
import { FaGamepad, FaUpload, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const CreateSmecGame = () => {
  // Sample categories - can be dynamic
  const gameCategories = [
    "E-Games",  
    "Strategy Games",
    "Sports Simulation",
    "Battle Royale",
    "MOBA",
    "Card Games"
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <FaGamepad className="mr-2 text-purple-500" />
        Create New Game Event
      </h1>

      <form className="space-y-8">
        {/* Basic Information Section */}
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
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="E.g., PUBG Tournament"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Game Category
              </label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Category</option>
                {gameCategories.map((category, index) => (
                  <option key={index} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              Game Description
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
              placeholder="Describe the game rules, format, and special requirements..."
              required
            />
          </div>
        </div>

        {/* Event Configuration Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            Event Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Maximum Participants
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="E.g., 100"
                min="2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Registration Deadline
              </label>
              <input
                type="datetime-local"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FaUpload className="mr-2 text-gray-500" />
            Game Media
          </h2>

          <div className="border-2 border-dashed rounded-xl p-8 text-center">
            <FaUpload className="mx-auto text-3xl text-gray-400 mb-4" />
            <p className="text-gray-600">
              Drag and drop game banner/images here or{' '}
              <span className="text-purple-500 cursor-pointer">browse</span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Recommended size: 1200x400px (Max 5MB)
            </p>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Create Game Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSmecGame;
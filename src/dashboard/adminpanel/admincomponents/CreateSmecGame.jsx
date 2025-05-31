import React, { useEffect, useState } from 'react';
import { FaGamepad, FaUpload, FaTimes, FaImage } from 'react-icons/fa';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';
import { notification } from 'antd';

const CreateSmecGame = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    time: '',
    lead: '',
    coLead: '',
    price: '',
    player: '',
    venue: '',
    bannerImage: null,
    bannerImagePreview: ''
  });

  // Options state
  const [categories, setCategories] = useState([]);
  const [leadOptions, setLeadOptions] = useState([]);
  const [coLeadOptions, setCoLeadOptions] = useState([]);

  useEffect(() => {
    fetchAcceptedUsers();
    fetchCategories();
  }, []);

 // Update the fetchCategories function
const fetchCategories = async () => {
  try {
    const res = await axios.get(AppRoutes.category);
    console.log("Categories API response:", res.data); // Debug log
    setCategories(res.data);
  } catch (err) {
    console.error('Error fetching categories', err);
    notification.error({
      message: 'Error',
      description: 'Failed to load categories',
      placement: 'topRight'
    });
  }
};

// Update the fetchAcceptedUsers function
const fetchAcceptedUsers = async () => {
  try {
    const res = await axios.get(AppRoutes.usersaccepted);
    console.log("Users API response:", res.data); // Debug log
    
    if (res.data && res.data.success) {
      // SMECPost uses "Name" instead of "name"
      setLeadOptions(res.data.data.lead);
      setCoLeadOptions(res.data.data.coLead);
    } else {
      notification.warning({
        message: 'Warning',
        description: 'Unexpected user data format',
        placement: 'topRight'
      });
    }
  } catch (err) {
    console.error('Error fetching users', err);
    notification.error({
      message: 'Error',
      description: 'Failed to load user options',
      placement: 'topRight'
    });
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        bannerImage: file,
        bannerImagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const removeBannerImage = () => {
    setFormData(prev => ({
      ...prev,
      bannerImage: null,
      bannerImagePreview: ''
    }));
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('category', formData.category);
    formPayload.append('description', formData.description);
    formPayload.append('date', formData.date);
    formPayload.append('time', formData.time);
    formPayload.append('lead', formData.lead);
    formPayload.append('coLead', formData.coLead);
    formPayload.append('price', formData.price);
    formPayload.append('player', formData.player);
    formPayload.append('venue', formData.venue);
    
    if (formData.bannerImage) {
      formPayload.append('bannerImage', formData.bannerImage);
    }

    try {
      const response = await axios.post(AppRoutes.creategame, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({
        message: 'Success',
        description: 'Game created successfully!',
        placement: 'topRight'
      });

      // Reset form
      setFormData({
        title: '',
        category: '',
        description: '',
        date: '',
        time: '',
        lead: '',
        coLead: '',
        price: '',
        player: '',
        venue: '',
        bannerImage: null,
        bannerImagePreview: ''
      });

    } catch (error) {
      console.error('Error creating game:', error.response?.data || error.message);
      notification.error({
        message: 'Error',
        description: 'Failed to create game. Please try again.',
        placement: 'topRight'
      });
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
            {/* Game Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Game Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-3 border rounded-lg"
                value={formData.title}
                onChange={handleChange}
                placeholder="E.g., PUBG Tournament"
                required
              />
            </div>

            {/* Game Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Game Category</label>
              <select
                name="category"
                className="w-full p-3 border rounded-lg"
                value={formData.category}
                onChange={handleChange}
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

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                className="w-full p-3 border rounded-lg"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <input
                type="time"
                name="time"
                className="w-full p-3 border rounded-lg"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            {/* Lead */}
            <div>
              <label className="block text-sm font-medium mb-2">Lead</label>
              <select
                name="lead"
                className="w-full p-3 border rounded-lg"
                value={formData.lead}
                onChange={handleChange}
              >
                <option value="">Select Lead</option>
                {leadOptions.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Co-Lead */}
            <div>
              <label className="block text-sm font-medium mb-2">Co-Lead</label>
              <select
                name="coLead"
                className="w-full p-3 border rounded-lg"
                value={formData.coLead}
                onChange={handleChange}
              >
                <option value="">Select Co-Lead</option>
                {coLeadOptions.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                className="w-full p-3 border rounded-lg"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price for participation"
                required
                min="0"
                step="0.01"
              />
            </div>

            {/* Players */}
            <div>
              <label className="block text-sm font-medium mb-2">Players</label>
              <input
                type="number"
                name="player"
                className="w-full p-3 border rounded-lg"
                value={formData.player}
                onChange={handleChange}
                placeholder="Enter max number of players"
                required
                min="1"
              />
            </div>

            {/* Venue */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Venue</label>
              <input
                type="text"
                name="venue"
                className="w-full p-3 border rounded-lg"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter venue address"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                className="w-full p-3 border rounded-lg"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a brief description about the game"
                required
                rows="4"
              />
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FaImage className="mr-2 text-gray-500" />
            Banner Image
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            {formData.bannerImagePreview ? (
              <div className="relative">
                <img
                  src={formData.bannerImagePreview}
                  alt="Banner Preview"
                  className="w-full h-64 object-contain rounded-md"
                />
                <button
                  type="button"
                  onClick={removeBannerImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <FaImage className="text-gray-400 text-4xl mb-4" />
                <p className="text-sm text-gray-500 mb-2 text-center">
                  Click to upload or drag & drop banner image
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  PNG, JPG, JPEG (Max. 5MB)
                </p>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleBannerImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    id="banner-upload"
                  />
                  <label
                    htmlFor="banner-upload"
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center cursor-pointer"
                  >
                    <FaUpload className="mr-2" /> Choose File
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg"
          >
            Create Game Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSmecGame;
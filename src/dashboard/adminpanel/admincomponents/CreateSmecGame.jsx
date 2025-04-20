import React, { useEffect, useState } from 'react';
import { FaGamepad, FaUpload, FaTimes, FaImage } from 'react-icons/fa';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';

const CreateSmecGame = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lead, setLead] = useState('');
  const [coLead, setCoLead] = useState('');
  const [price, setPrice] = useState('');
  const [player, setPlayer] = useState('');
  const [venue, setVenue] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState('');

  const [categories, setCategories] = useState([]);
  const [leadOptions, setLeadOptions] = useState([]);
  const [coLeadOptions, setCoLeadOptions] = useState([]);

  useEffect(() => {
    fetchAcceptedUsers();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(AppRoutes.category);
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const fetchAcceptedUsers = async () => {
    try {
      const res = await axios.get(AppRoutes.usersaccepted);
      if (res.data.success) {
        setLeadOptions(res.data.data.lead);
        setCoLeadOptions(res.data.data.coLead);
      }
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setBannerImagePreview(URL.createObjectURL(file));
    }
  };

  const removeBannerImage = () => {
    setBannerImage(null);
    setBannerImagePreview('');
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();

    // Ensure you're passing the correct ObjectId for category, lead, and coLead
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);  // Assuming category is selected as an object
    formData.append('description', description);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('lead', leadOptions );  // Ensure valid ObjectId or empty string
    formData.append('coLead', coLeadOptions);  // Ensure valid ObjectId or empty string
    formData.append('price', price);
    formData.append('player', player);
    formData.append('venue', venue);
    if (bannerImage) {
      formData.append('bannerImage', bannerImage);  // Include banner image in the form data
    }

    console.log("Form Data:", formData); // Debugging line to check form data
    console.log("Form Data Entries:", [...formData]); // Debugging line to check form data entries

    

    try {
      const response = await axios.post(AppRoutes.creategame, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Game created:', response.data);
      alert('Game created successfully!');

      // Reset form
      setTitle('');
      setCategory('');
      setDescription('');
      setDate('');
      setTime('');
      setLead('');
      setCoLead('');
      setPrice('');
      setPlayer('');
      setVenue('');
      setBannerImage(null);
      setBannerImagePreview(null);
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
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a brief description about the game"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Enter venue address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price for participation"
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
                placeholder="Enter max number of players"
                required
              />
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            {bannerImagePreview ? (
              <div className="relative">
                <img
                  src={bannerImagePreview}
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
                <p className="text-sm text-gray-500 mb-2">Click to upload banner image</p>
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

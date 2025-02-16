import React, { useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const NewsManagement = () => {
  const [newsList, setNewsList] = useState([
    { id: 1, title: 'SMEC Tournament Updates', date: '2024-03-01', content: 'The SMEC gaming tournament started today with PUBG matches!', image: null },
    { id: 2, title: 'Annual Dinner Announcement', date: '2024-03-02', content: 'The Annual Dinner event will be held on 15th March 2024.', image: null },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNews, setEditNews] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [newsToDelete, setNewsToDelete] = useState(null);

  // Add new news post
  const handleAddNews = (title, content, image) => {
    const newNews = { id: newsList.length + 1, title, content, date: new Date().toISOString().split('T')[0], image };
    setNewsList([...newsList, newNews]);
    setIsModalOpen(false);
  };

  // Edit news post
  const handleEditNews = (id) => {
    const news = newsList.find(n => n.id === id);
    setEditNews(news);
    setImagePreview(news.image);
    setIsModalOpen(true);
  };

  // Save edited news
  const handleSaveEditedNews = (title, content, image) => {
    setNewsList(newsList.map(n => (n.id === editNews.id ? { ...n, title, content, image } : n)));
    setIsModalOpen(false);
  };

  // Delete a news post
  const handleDeleteNews = () => {
    setNewsList(newsList.filter(news => news.id !== newsToDelete.id));
    setIsDeleteModalOpen(false);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Modal to add/edit news
  const Modal = ({ isOpen, onClose, onSave, newsData }) => {
    const [title, setTitle] = useState(newsData ? newsData.title : '');
    const [content, setContent] = useState(newsData ? newsData.content : '');

    return isOpen ? (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">{newsData ? 'Edit' : 'Add'} News</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter News Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Enter News Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 max-w-full h-40 object-cover" />}
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              onClick={() => onSave(title, content, imagePreview)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    ) : null;
  };

  // Delete confirmation modal
  const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    return isOpen ? (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this news post?</p>
          <div className="flex justify-between">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Management</h1>
        <button
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" />
          Add News
        </button>
      </div>

      <div className="space-y-4">
        {newsList.map(news => (
          <div key={news.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{news.title}</h2>
                <p className="text-gray-600 text-sm">{news.date}</p>
              </div>
              <div>
                <button
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mr-2"
                  onClick={() => handleEditNews(news.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  onClick={() => {
                    setNewsToDelete(news);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="mt-2">{news.content}</p>
            {news.image && <img src={news.image} alt="News" className="mt-4 max-w-full h-40 object-cover" />}
          </div>
        ))}
      </div>

      {/* Modal for Adding/Editing News */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEditedNews}
        newsData={editNews}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteNews}
      />
    </div>
  );
};

export default NewsManagement;

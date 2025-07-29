import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';

const NewsManagement = () => {
  const [newsList, setNewsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNews, setEditNews] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(AppRoutes.news);
      setNewsList(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news');
      setLoading(false);
    }
  };

  const handleAddNews = async (formData) => {
    try {
      await axios.post(AppRoutes.news, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchNews();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding news:', err);
      alert('Failed to add news');
    }
  };

  const handleEditNews = (news) => {
    setEditNews(news);
    setIsModalOpen(true);
  };

  const handleSaveEditedNews = async (formData) => {
    try {
      await axios.put(`${AppRoutes.news}/${editNews._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchNews();
      setIsModalOpen(false);
      setEditNews(null);
    } catch (err) {
      console.error('Error updating news:', err);
      alert('Failed to update news');
    }
  };

  const handleDeleteNews = async () => {
    try {
      await axios.delete(`${AppRoutes.news}/${newsToDelete._id}`);
      fetchNews();
      setIsDeleteModalOpen(false);
      setNewsToDelete(null);
    } catch (err) {
      console.error('Error deleting news:', err);
      alert('Failed to delete news');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Modal component
  const Modal = ({ isOpen, onClose, onSave, newsData }) => {
    const [title, setTitle] = useState(newsData ? newsData.title : '');
    const [content, setContent] = useState(newsData ? newsData.content : '');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(
      newsData && newsData.image ? `${AppRoutes.BASE_URL}${newsData.image}` : null
    );

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (newsData) {
        onSave(formData);
      } else {
        handleAddNews(formData);
      }
    };

    return isOpen ? (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">{newsData ? 'Edit' : 'Add'} News</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter News Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border rounded-lg"
                placeholder="Enter News Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">News Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-lg"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full h-40 object-contain" 
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
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

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-64">
        <p className="text-lg">Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchNews}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Management</h1>
        <button
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center"
          onClick={() => {
            setEditNews(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus className="mr-2" />
          Add News
        </button>
      </div>

      {newsList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No news available. Add your first news post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {newsList.map(news => (
            <div key={news._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{news.title}</h2>
                  <p className="text-gray-600 text-sm">{formatDate(news.date)}</p>
                </div>
                <div className="flex">
                  <button
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mr-2"
                    onClick={() => handleEditNews(news)}
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
              <p className="mt-2 whitespace-pre-line">{news.content}</p>
              {news.image && (
                <div className="mt-4">
                  <img 
                    src={`${AppRoutes.BASE_URL}${news.image}`} 
                    alt="News" 
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding/Editing News */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditNews(null);
        }}
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
import React, { useState, useEffect } from 'react';
import { FaSave, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';
import { notification } from 'antd';

const Announcements = () => {
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('All');
  
  // Announcements data
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [deletingAnnouncement, setDeletingAnnouncement] = useState(null);

  // Fetch announcements from backend
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axios.get(AppRoutes.announcements);
      setAnnouncements(res.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError('Failed to load announcements. Please try again.');
      notification.error({
        message: 'Error',
        description: 'Failed to load announcements',
        placement: 'topRight'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle form submission (create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(AppRoutes.announcements, {
        title,
        description,
        audience
      });
      
      notification.success({
        message: 'Success',
        description: 'Announcement created successfully',
        placement: 'topRight'
      });
      
      // Reset form and refresh list
      setTitle('');
      setDescription('');
      setAudience('All');
      fetchAnnouncements();
    } catch (err) {
      console.error('Error creating announcement:', err);
      notification.error({
        message: 'Error',
        description: 'Failed to create announcement',
        placement: 'topRight'
      });
    }
  };

  // Open edit modal
  const openEditModal = (announcement) => {
    setEditingAnnouncement(announcement);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setAudience(announcement.audience);
    setShowEditModal(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingAnnouncement(null);
    setTitle('');
    setDescription('');
    setAudience('All');
  };

  // Handle edit submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`${AppRoutes.announcements}/${editingAnnouncement._id}`, {
        title,
        description,
        audience
      });
      
      notification.success({
        message: 'Success',
        description: 'Announcement updated successfully',
        placement: 'topRight'
      });
      
      closeEditModal();
      fetchAnnouncements();
    } catch (err) {
      console.error('Error updating announcement:', err);
      notification.error({
        message: 'Error',
        description: 'Failed to update announcement',
        placement: 'topRight'
      });
    }
  };

  // Open delete modal
  const openDeleteModal = (announcement) => {
    setDeletingAnnouncement(announcement);
    setShowDeleteModal(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingAnnouncement(null);
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${AppRoutes.announcements}/${deletingAnnouncement._id}`);
      
      notification.success({
        message: 'Success',
        description: 'Announcement deleted successfully',
        placement: 'topRight'
      });
      
      closeDeleteModal();
      fetchAnnouncements();
    } catch (err) {
      console.error('Error deleting announcement:', err);
      notification.error({
        message: 'Error',
        description: 'Failed to delete announcement',
        placement: 'topRight'
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={fetchAnnouncements}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Announcement</h1>
      
      {/* Announcement Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border rounded-lg"
            required
          />
          
          <textarea
            placeholder="Announcement Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded-lg h-40"
            required
          />
          
          <div>
            <label htmlFor="audience" className="block mb-1 font-medium">Select Audience:</label>
            <select
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="p-3 border rounded-lg w-full"
            >
              <option value="All">All (Users + Judges)</option>
              <option value="Users">Users Only</option>
              <option value="Judges">Judges Only</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <FaSave className="mr-2" /> Create Announcement
          </button>
        </div>
      </form>

      {/* List of Announcements */}
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      
      {announcements.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">No announcements found</p>
          <p className="text-gray-400 mt-2">Create your first announcement using the form above</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Audience</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {announcements.map(announcement => (
                <tr key={announcement._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{announcement.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      announcement.audience === 'All' ? 'bg-blue-100 text-blue-800' :
                      announcement.audience === 'Users' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {announcement.audience}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatDate(announcement.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => openEditModal(announcement)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(announcement)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Announcement Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Announcement</h2>
              <button
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Announcement Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-3 border rounded-lg w-full"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  placeholder="Announcement Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 border rounded-lg h-40 w-full"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="p-3 border rounded-lg w-full"
                >
                  <option value="All">All (Users + Judges)</option>
                  <option value="Users">Users Only</option>
                  <option value="Judges">Judges Only</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Announcement Modal */}
      {showDeleteModal && deletingAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Delete Announcement</h2>
              <button
                onClick={closeDeleteModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            <p className="mb-4">
              Are you sure you want to delete this announcement?
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-lg">{deletingAnnouncement.title}</h3>
              <p className="text-gray-600 mt-1">{deletingAnnouncement.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500">
                  For: {deletingAnnouncement.audience}
                </span>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-500">
                  {formatDate(deletingAnnouncement.createdAt)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
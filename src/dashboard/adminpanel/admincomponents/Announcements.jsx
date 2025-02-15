import React, { useState } from 'react';
import { FaSave, FaTrash, FaEdit } from 'react-icons/fa';

const Announcements = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('All');
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Upcoming Tournament Announcement',
      description: 'Don\'t miss the upcoming tournament this weekend.',
      audience: 'All',
      createdAt: '2024-03-01',
    },
    {
      id: 2,
      title: 'Judge’s Meeting on 15th March',
      description: 'All judges are required to attend the meeting.',
      audience: 'Judges',
      createdAt: '2024-03-02',
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [deletingAnnouncement, setDeletingAnnouncement] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAnnouncement = {
      id: announcements.length + 1,
      title,
      description,
      audience,
      createdAt: new Date().toLocaleDateString(),
    };
    
    setAnnouncements([...announcements, newAnnouncement]);
    setTitle('');
    setDescription('');
    setAudience('All');
  };

  const openEditModal = (announcement) => {
    setEditingAnnouncement(announcement);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingAnnouncement(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAnnouncements(announcements.map(announcement =>
      announcement.id === editingAnnouncement.id
        ? { ...announcement, title, description, audience }
        : announcement
    ));
    closeEditModal();
  };

  const openDeleteModal = (announcement) => {
    setDeletingAnnouncement(announcement);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingAnnouncement(null);
  };

  const handleDelete = () => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== deletingAnnouncement.id));
    closeDeleteModal();
  };

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
            <label htmlFor="audience" className="block">Select Audience:</label>
            <select
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="p-3 border rounded-lg w-full"
            >
              <option value="All">All</option>
              <option value="Users">Users</option>
              <option value="Judges">Judges</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <FaSave className="mr-2" /> Save Announcement
          </button>
        </div>
      </form>

      {/* List of Announcements */}
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
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
              <tr key={announcement.id}>
                <td className="px-6 py-4">{announcement.title}</td>
                <td className="px-6 py-4">{announcement.audience}</td>
                <td className="px-6 py-4">{announcement.createdAt}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => openEditModal(announcement)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(announcement)}
                      className="text-red-500 hover:text-red-700"
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

      {/* Edit Announcement Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Announcement</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Announcement Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 border rounded-lg mb-4 w-full"
                required
              />
              <textarea
                placeholder="Announcement Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 border rounded-lg h-40 mb-4 w-full"
                required
              />
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="p-3 border rounded-lg w-full mb-4"
              >
                <option value="All">All</option>
                <option value="Users">Users</option>
                <option value="Judges">Judges</option>
              </select>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-300 py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Announcement Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Delete Announcement</h2>
            <p>Are you sure you want to delete this announcement?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="bg-gray-300 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;

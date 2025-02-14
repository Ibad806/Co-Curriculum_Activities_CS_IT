import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSearch, FaTimes } from 'react-icons/fa';

const ManageEvents = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample data - replace with real data
  const [events, setEvents] = useState([
    { 
      id: 1, 
      name: 'SMEC Finals', 
      date: '2024-03-15', 
      tickets: 150, 
      status: 'Active',
      category: 'e-sports',
      description: 'Annual SMEC championship finals'
    },
    { 
      id: 2, 
      name: 'Qawali Night', 
      date: '2024-03-20', 
      tickets: 200, 
      status: 'Draft',
      category: 'cultural',
      description: 'Traditional music night'
    },
    { 
      id: 3, 
      name: 'Tech Symposium', 
      date: '2024-04-01', 
      tickets: 80, 
      status: 'Completed',
      category: 'tech',
      description: 'Annual tech conference'
    },
  ]);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setEvents(events.filter(e => e.id !== selectedEvent.id));
    setShowDeleteModal(false);
  };

  const saveChanges = (updatedEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setShowEditModal(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search and Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Manage Events</h1>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Event Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Tickets</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4">{event.name}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.tickets}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    event.status === 'Active' ? 'bg-green-100 text-green-800' :
                    event.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex space-x-4">
                  <button 
                    onClick={() => handleEdit(event)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(event)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Event Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Event</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Name</label>
                <input
                  type="text"
                  value={selectedEvent?.name || ''}
                  onChange={(e) => setSelectedEvent({...selectedEvent, name: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedEvent?.date || ''}
                    onChange={(e) => setSelectedEvent({...selectedEvent, date: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={selectedEvent?.status || ''}
                    onChange={(e) => setSelectedEvent({...selectedEvent, status: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={selectedEvent?.description || ''}
                  onChange={(e) => setSelectedEvent({...selectedEvent, description: e.target.value})}
                  className="w-full p-2 border rounded h-32"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveChanges(selectedEvent)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Delete Event</h2>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete the event:<br />
              <strong>{selectedEvent?.name}</strong>?
            </p>

            <div className="flex justify-end space-x-4">
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
    </div>
  );
};

export default ManageEvents;
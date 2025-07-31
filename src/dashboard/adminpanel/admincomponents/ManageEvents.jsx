import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSearch, FaTimes, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, Space } from 'antd';
// import { DownOutlined } from '@ant-design/icons';

const ManageEvents = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const navigate = useNavigate();

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await axios.get(AppRoutes.event);
      console.log("response", res.data);
      
      setEvents(res.data);
      setFilteredEvents(res.data); // Initialize filtered events with all events
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Apply filters whenever searchTerm or statusFilter changes
  useEffect(() => {
    let results = events;

    // Apply title search filter
    if (searchTerm) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(results);
  }, [searchTerm, statusFilter, events]);

  const handleEdit = (event) => {
    setSelectedEvent({ ...event });
    setShowEditModal(true);
  };

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${AppRoutes.event}/${selectedEvent._id}`);
      console.log('Event deleted successfully');
      setEvents(events.filter(e => e._id !== selectedEvent._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const saveChanges = async (updatedEvent) => {
    try {
      const res = await axios.put(`${AppRoutes.event}/${updatedEvent._id}`, updatedEvent);
      console.log('Event updated successfully');
      setEvents(events.map(e => (e._id === updatedEvent._id ? res.data : e)));
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  // Status filter menu items
  const statusMenu = (
    <Menu
      onClick={({ key }) => setStatusFilter(key)}
      selectedKeys={[statusFilter]}
      items={[
        { label: 'All Statuses', key: 'all' },
        { label: 'Active', key: 'active' },
        { label: 'Inactive', key: 'inactive' },
        { label: 'Draft', key: 'draft' },
        { label: 'Complete', key: 'complete' },
      ]}
    />
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto'>
          <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter Dropdown */}
        {/* Ant Design Dropdown for Status Filter */}
        <Dropdown overlay={statusMenu} trigger={['click']}>
            <Button className="flex items-center justify-between w-full md:w-48">
              <Space>
                {statusFilter === 'all' ? 'All Statuses' : 
                 statusFilter === 'active' ? 'Active' :
                 statusFilter === 'inactive' ? 'Inactive' :
                 statusFilter === 'draft' ? 'Draft' : 'Complete'}
                 <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
                {/* <DownOutlined className="text-xs" /> */}
              </Space>
            </Button>
          </Dropdown>
        </div>

        <div className="w-full md:w-auto">
          <button
            className="flex items-center justify-center gap-2 w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            onClick={() => navigate('/adminpanel/addnewevent')}
          >
            <FaPlus className="text-sm" />
            <span>Add New Event</span>
          </button>
        </div>
      </div>

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
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr key={event._id}>
                  <td className="px-6 py-4">{event.title}</td>
                  <td className="px-6 py-4">{event.startdate}</td>
                  <td className="px-6 py-4">{event.ticketPrice || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${event.status === 'active' ? 'bg-green-100 text-green-800' :
                        event.status === 'inactive' ? 'bg-red-400 text-black' :
                          event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            event.status === 'complete' ? 'bg-gray-200 text-gray-800' :
                              'bg-gray-100 text-gray-800'
                      }`}>
                      {event.status === 'active' ? 'Active' :
                        event.status === 'inactive' ? 'Inactive' :
                          event.status === 'draft' ? 'Draft' :
                            event.status === 'complete' ? 'Complete' :
                              'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button onClick={() => handleEdit(event)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(event)} className="text-red-500 hover:text-red-700">
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No events found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Event</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); saveChanges(selectedEvent); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Title</label>
                  <input
                    type="text"
                    value={selectedEvent?.title || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Status</label>
                  <select
                    value={selectedEvent?.status || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                    <option value="complet">Complete</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Date</label>
                  <input
                    type="date"
                    value={selectedEvent?.startdate?.split('T')[0] || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, startdate: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Registration Deadline</label>
                  <input
                    type="date"
                    value={selectedEvent?.registrationDeadline || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, registrationDeadline: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter registration deadline"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Category</label>
                  <select
                    value={selectedEvent?.category || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, category: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="ticketing">Ticketing</option>
                    <option value="nonticketing">Non-Ticketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subcategory</label>
                  <select
                    value={selectedEvent?.subcategory || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, subcategory: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {(selectedEvent?.category === 'ticketing' ? ['SMCE', 'Qawali night', 'Annual Dinner'] : ['seminar', 'blood drive', 'winter drive']).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Event Description</label>
                <textarea
                  value={selectedEvent?.description || ''}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Detailed event description..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Event Banner</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const fakeUrl = URL.createObjectURL(file);
                      setSelectedEvent({ ...selectedEvent, eventimageurl: fakeUrl });
                    }
                  }}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ticket Price ($)</label>
                  <input
                    type="number"
                    value={selectedEvent?.ticketPrice || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, ticketPrice: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Location</label>
                  <input
                    value={selectedEvent?.locationDetails || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, locationDetails: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location details"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Delete Event</h2>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete the event:<br />
              <strong>{selectedEvent?.title}</strong>?
            </p>

            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
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

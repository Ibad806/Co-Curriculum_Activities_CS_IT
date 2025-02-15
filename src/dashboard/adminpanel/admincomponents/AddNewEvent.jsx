import React from 'react';
import { FaCalendarPlus, FaUpload } from 'react-icons/fa';

const AddNewEvent = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <FaCalendarPlus className="mr-2 text-blue-500" />
        Create New Event
      </h1>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Event Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Date & Time</label>
            <input
              type="datetime-local"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Event Category</label>
          <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Select Category</option>
            <option value="e-sports">E-Sports</option>
            <option value="tech">Tech Events</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Event Description</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Detailed event description..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Event Banner</label>
          <div className="flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6">
            <div className="text-center">
              <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Drag and drop or <span className="text-blue-500">browse</span> to upload
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Ticket Price ($)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Total Tickets</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Available tickets"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AddNewEvent;
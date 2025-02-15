import React from 'react';
import { FaUsers, FaTicketAlt, FaBell, FaClipboardList } from 'react-icons/fa';

const AdminHome = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric Cards */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">1,250</p>
          <div className="mt-4">
            <FaUsers className="text-blue-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Tickets Sold</h2>
          <p className="text-3xl font-bold">1,150</p>
          <div className="mt-4">
            <FaTicketAlt className="text-green-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <ul className="space-y-2">
            <li className="text-sm">Event 1 - March 25, 2024</li>
            <li className="text-sm">Event 2 - April 5, 2024</li>
          </ul>
          <div className="mt-4">
            <FaClipboardList className="text-yellow-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Announcements</h2>
          <p className="text-3xl font-bold">25</p>
          <div className="mt-4">
            <FaBell className="text-red-500 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>New User Registration</span>
            <span className="text-sm text-gray-500">March 1, 2024</span>
          </li>
          <li className="flex justify-between">
            <span>New Ticket Purchase</span>
            <span className="text-sm text-gray-500">March 2, 2024</span>
          </li>
          <li className="flex justify-between">
            <span>New Announcement Added</span>
            <span className="text-sm text-gray-500">March 3, 2024</span>
          </li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <span className="font-semibold">Create Announcement</span>
          <button className="bg-white text-blue-500 py-2 px-4 rounded-lg">Go</button>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <span className="font-semibold">Manage Tickets</span>
          <button className="bg-white text-green-500 py-2 px-4 rounded-lg">Go</button>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <span className="font-semibold">Manage Users</span>
          <button className="bg-white text-yellow-500 py-2 px-4 rounded-lg">Go</button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

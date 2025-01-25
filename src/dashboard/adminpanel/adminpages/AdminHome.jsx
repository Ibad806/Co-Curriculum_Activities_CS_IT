import React from "react";
import {
  FaUsers,
  FaGavel,
  FaGamepad,
  FaClipboardList,
  FaDollarSign,
} from "react-icons/fa";

const AdminHome = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin!</h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of the platform's activity.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaUsers className="text-4xl text-indigo-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Total Users</h3>
            <p className="text-gray-500 text-lg">5,430</p>
          </div>
        </div>

        {/* Total Judges */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaGavel className="text-4xl text-indigo-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Total Judges</h3>
            <p className="text-gray-500 text-lg">120</p>
          </div>
        </div>

        {/* Total Games */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaGamepad className="text-4xl text-indigo-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Total Games</h3>
            <p className="text-gray-500 text-lg">35</p>
          </div>
        </div>

        {/* Total Tournaments */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaClipboardList className="text-4xl text-indigo-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Total Tournaments
            </h3>
            <p className="text-gray-500 text-lg">18</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FaDollarSign className="text-4xl text-indigo-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Revenue</h3>
            <p className="text-gray-500 text-lg">$12,450</p>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Latest User Registrations */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Latest User Registrations
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>John Doe</span>
              <span className="text-gray-500 text-sm">2025-01-15</span>
            </li>
            <li className="flex justify-between">
              <span>Jane Smith</span>
              <span className="text-gray-500 text-sm">2025-01-14</span>
            </li>
            <li className="flex justify-between">
              <span>Mike Johnson</span>
              <span className="text-gray-500 text-sm">2025-01-13</span>
            </li>
          </ul>
        </div>

        {/* Recent Tournaments Created */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Recent Tournaments Created
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>SMEC 2025</span>
              <span className="text-gray-500 text-sm">2025-01-10</span>
            </li>
            <li className="flex justify-between">
              <span>Valorant Championship</span>
              <span className="text-gray-500 text-sm">2025-01-09</span>
            </li>
            <li className="flex justify-between">
              <span>FIFA 2025</span>
              <span className="text-gray-500 text-sm">2025-01-08</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Notifications</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center">
            <span>Pending approval for Judge: Alex Doe</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              View
            </button>
          </li>
          <li className="flex justify-between items-center">
            <span>System alert: Low disk space</span>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Resolve
            </button>
          </li>
          <li className="flex justify-between items-center">
            <span>New tournament request: Apex Legends</span>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              Approve
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;

import React from "react";

const JudgesHome = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome back, Judge Rameez!</h2>
          <p className="text-gray-500 mt-2">You have 3 new notifications</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            View Notifications
          </button>
          <button className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800">
            Log Out
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Assigned Tournaments */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Tournaments</h3>
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col items-center bg-indigo-100 text-indigo-700 px-6 py-4 rounded-lg">
              <p className="text-4xl font-bold">5</p>
              <p className="text-sm font-medium">Tournaments</p>
            </div>
          </div>
        </div>

        {/* Matches Judged */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Matches Judged</h3>
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col items-center bg-green-100 text-green-700 px-6 py-4 rounded-lg">
              <p className="text-4xl font-bold">12</p>
              <p className="text-sm font-medium">Matches</p>
            </div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Matches</h3>
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col items-center bg-yellow-100 text-yellow-700 px-6 py-4 rounded-lg">
              <p className="text-4xl font-bold">3</p>
              <p className="text-sm font-medium">Matches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-2 xl:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Judged match between Team A and Team B</span>
              <span className="text-gray-500">04-01-2025</span>
            </li>
            <li className="flex justify-between">
              <span>Updated tournament results for PUBG Tournament</span>
              <span className="text-gray-500">03-01-2025</span>
            </li>
            <li className="flex justify-between">
              <span>Judged match between Team X and Team Y</span>
              <span className="text-gray-500">02-01-2025</span>
            </li>
          </ul>
        </div>

        {/* Notifications Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Pending match results for Team A vs. Team B</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
            <li className="flex justify-between">
              <span>Reminder: Submit results for PUBG Tournament</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
            <li className="flex justify-between">
              <span>New announcement from Admin</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JudgesHome;

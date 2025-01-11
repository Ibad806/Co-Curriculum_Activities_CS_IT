import React from "react";

const UserHome = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, User!</h1>
        <p className="text-gray-600 mt-2">
          Here's a quick overview of your dashboard.
        </p>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800">Tickets Booked</h2>
          <p className="text-4xl font-semibold text-blue-500 mt-2">5</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
          <p className="text-4xl font-semibold text-green-500 mt-2">2</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
          <p className="text-4xl font-semibold text-yellow-500 mt-2">3</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="text-gray-600 flex items-center">
            <span className="mr-2 text-blue-500">🎟</span>
            Purchased a ticket for "PUBG Tournament".
          </li>
          <li className="text-gray-600 flex items-center">
            <span className="mr-2 text-yellow-500">🔔</span>
            You have 3 new notifications.
          </li>
          <li className="text-gray-600 flex items-center">
            <span className="mr-2 text-green-500">✔️</span>
            Updated your profile information.
          </li>
        </ul>
      </div>

      {/* Quick Links Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600">
            Buy Tickets
          </button>
          <button className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600">
            View Upcoming Events
          </button>
          <button className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-600">
            Check Notifications
          </button>
          <button className="bg-gray-500 text-white p-4 rounded-lg shadow-md hover:bg-gray-600">
            Update Profile
          </button>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Schedule</h2>
        <p className="text-gray-600">No events scheduled for today.</p>
      </div>
    </div>
  );
};

export default UserHome;

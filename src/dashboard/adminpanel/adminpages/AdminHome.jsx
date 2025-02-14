import React from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
  FaImage,
  FaExclamationTriangle,
  FaClock,
  FaChartLine
} from "react-icons/fa";

const AdminHome = () => {
  // Sample data - replace with real data from your backend
  const stats = [
    { title: "Total Events", value: "24", icon: <FaCalendarAlt className="text-3xl" />, color: "bg-blue-100" },
    { title: "Registered Users", value: "1.2K", icon: <FaUsers className="text-3xl" />, color: "bg-green-100" },
    { title: "Ticket Sales", value: "892", icon: <FaTicketAlt className="text-3xl" />, color: "bg-yellow-100" },
    { title: "Gallery Updates", value: "56", icon: <FaImage className="text-3xl" />, color: "bg-purple-100" }
  ];

  const upcomingEvents = [
    { name: "SMEC Finals", date: "2024-03-15", status: "Upcoming" },
    { name: "Qawali Night", date: "2024-03-20", status: "Preparing" },
    { name: "Tech Symposium", date: "2024-04-01", status: "Draft" }
  ];

  const recentActivities = [
    { action: "New user registered", time: "2h ago" },
    { action: "Event 'Tech Fest' updated", time: "4h ago" },
    { action: "10 new tickets sold", time: "1d ago" },
    { action: "Gallery images updated", time: "2d ago" }
  ];

  const notifications = [
    { type: "alert", title: "Storage Warning", message: "Storage usage at 85% capacity" },
    { type: "update", title: "System Update", message: "New admin panel features available" },
    { type: "ticket", title: "High Demand", message: "SMEC tickets selling fast" }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} p-4 rounded-xl shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className="text-gray-600">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaClock className="mr-2 text-green-500" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{activity.action}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications & Alerts */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaExclamationTriangle className="mr-2 text-red-500" />
          System Notifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notifications.map((notification, index) => (
            <div key={index} className="p-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <FaChartLine className="mr-2 text-gray-600" />
                <h3 className="font-medium">{notification.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ticket Sales Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Ticket Sales Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>SMEC Tickets</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Qawali Night</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">System Health</h2>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="radial-progress text-blue-500" style={{"--value":85}}>85%</div>
              <p className="mt-2 text-sm">Storage</p>
            </div>
            <div className="text-center">
              <div className="radial-progress text-green-500" style={{"--value":95}}>95%</div>
              <p className="mt-2 text-sm">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
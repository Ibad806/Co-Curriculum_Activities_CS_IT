import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserHome = () => {
  // Sample data for the graph
  const data = [
    { month: "Jan", pastYear: 2, thisYear: 5 },
    { month: "Feb", pastYear: 4, thisYear: 8 },
    { month: "Mar", pastYear: 6, thisYear: 10 },
    { month: "Apr", pastYear: 8, thisYear: 12 },
    { month: "May", pastYear: 10, thisYear: 15 },
    { month: "Jun", pastYear: 12, thisYear: 18 },
    { month: "Jul", pastYear: 15, thisYear: 20 },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen ml-64">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-wrap justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, Rameez!
          </h2>
          <p className="text-gray-500 mt-2">You have 4 new messages</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-blue-600">
            Buy Ticket
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-gray-800">
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* SMEC - Competition Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            SMEC - Competition
          </h3>
          <div className="flex justify-between space-x-1">
            {/* Participated */}
            <div className="flex flex-col items-center bg-indigo-100 text-indigo-700 px-4 py-3 md:px-4 md:py-4 rounded-lg">
              <p className="text-2xl md:text-4xl font-bold">3</p>
              <p className="text-sm md:text-base font-medium">Participated</p>
            </div>

            {/* Won */}
            <div className="flex flex-col items-center bg-indigo-100 text-indigo-700 px-4 py-3 md:px-4 md:py-4 rounded-lg">
              <p className="text-2xl md:text-4xl font-bold">1</p>
              <p className="text-sm md:text-base font-medium">Participated</p>
            </div>
          </div>
        </div>

        {/* Active Tickets Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Active Tickets
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span>SMEC: FC25</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span>SMEC: Valorant</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span>SMEC: Speed Debugging</span>
              <button className="text-blue-500 hover:underline">View</button>
            </li>
          </ul>
        </div>

        {/* Announcement Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Announcement
          </h3>
          <p className="text-gray-500">No new announcements</p>
          <button className="text-blue-500 hover:underline mt-4">View</button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* My Activity Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 xl:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            My Activity
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Purchased a ticket for Qawali</span>
              <span className="text-gray-500">04-01-2025</span>
            </li>
            <li className="flex justify-between">
              <span>Purchased a ticket for SMEC</span>
              <span className="text-gray-500">04-01-2025</span>
            </li>
            <li className="flex justify-between">
              <span>Purchased a ticket for Concert</span>
              <span className="text-gray-500">04-01-2025</span>
            </li>
          </ul>
        </div>

        {/* Tickets Booked Graph Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tickets Booked
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} />
              <Legend
                align="center"
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ marginTop: "10px" }}
              />
              <Line
                type="monotone"
                dataKey="pastYear"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ stroke: "#8884d8", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Past Years"
              />
              <Line
                type="monotone"
                dataKey="thisYear"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ stroke: "#82ca9d", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="This Year"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

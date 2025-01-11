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
  Defs,
  LinearGradient,
  Stop,
} from "recharts";

const TicketsBookedChart = () => {
  // Sample data
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
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tickets Booked</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="pastYearColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="thisYearColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid stroke="#f5f5f5" />

          {/* Axes */}
          <XAxis dataKey="month" stroke="#999" />
          <YAxis stroke="#999" />

          {/* Tooltip */}
          <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} />

          {/* Legend */}
          <Legend
            align="center"
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ marginTop: "10px" }}
          />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="pastYear"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ stroke: "#8884d8", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            fillOpacity={1}
            fill="url(#pastYearColor)"
            name="Past Years"
          />
          <Line
            type="monotone"
            dataKey="thisYear"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ stroke: "#82ca9d", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            fillOpacity={1}
            fill="url(#thisYearColor)"
            name="This Year"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TicketsBookedChart;

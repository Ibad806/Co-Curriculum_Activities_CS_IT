import React from "react";
import { useSelector } from "react-redux";

const UserTicket = () => {
  const tickets = useSelector((state) => state.tickets.tickets);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">My Tickets</h1>
        <p className="text-gray-500 mt-2">
          View all the tickets you’ve purchased below.
        </p>
      </div>

      {/* Tickets Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{ticket.title}</h2>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Name:</span> {ticket.userName}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {ticket.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Price:</span> Rs {ticket.price}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Payment Method:</span> {ticket.paymentMethod}
                </p>
              </div>
              <div className="sm:text-right">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">No Tickets Found</h2>
            <p className="text-gray-500 mt-2">
              You haven’t purchased any tickets yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTicket;

import React, { useState } from "react";
import { useSelector } from "react-redux";

const UserTicket = () => {
  // Fetch tickets from Redux store
  const tickets = useSelector((state) => state.tickets.tickets);

  // State for handling the currently viewed ticket
  const [viewTicket, setViewTicket] = useState(null);

  // Handle viewing ticket details
  const handleViewTicket = (ticket) => {
    setViewTicket(ticket);
  };

  // Handle closing ticket details
  const handleCloseTicket = () => {
    setViewTicket(null);
  };

  // Handle downloading a ticket
  const handleDownloadTicket = (ticketId) => {
    alert(`Downloading ticket with ID: ${ticketId}`);
    // Add download logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Page Header */}
      <div className="shadow-md rounded-lg py-6 px-4 mb-8 bg-white">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">My Tickets</h1>
        <p className="text-gray-500 mt-2">
          View all the tickets you’ve purchased below.
        </p>
      </div>

      {/* Tickets Section */}
      <div className="mx-auto space-y-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-l-4 border-blue-500"
            >
              {/* Ticket Details Preview */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">{ticket.title}</h2>
                <p className="text-gray-500 text-sm mt-2">
                  <span className="font-semibold">Date:</span> {ticket.date}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleViewTicket(ticket)}
                  className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                >
                  View Ticket
                </button>
                <button
                  onClick={() => handleDownloadTicket(ticket.id)}
                  className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                >
                  Download Ticket
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">No Tickets Found</h2>
            <p className="text-gray-500 mt-2">
              You haven’t purchased any tickets yet.
            </p>
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      {viewTicket && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={handleCloseTicket}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            {/* Ticket Details */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Ticket Details
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Title:</strong> {viewTicket.title}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Name:</strong> {viewTicket.userName}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {viewTicket.email}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Price:</strong> {viewTicket.price}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Payment Method:</strong> {viewTicket.paymentMethod}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Date:</strong> {viewTicket.date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTicket;

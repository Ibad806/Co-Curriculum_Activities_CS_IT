import React, { useState } from 'react';
import { FaEye, FaCheckCircle, FaTimesCircle, FaSort } from 'react-icons/fa';

const TicketManagement = () => {
  // Sample data for pending tickets
  const [tickets, setTickets] = useState([
    {
      id: 1,
      userName: "Ali Ahmed",
      gameName: "PUBG",
      amount: 500,
      status: "Pending",
      paymentDate: "2024-03-01",
      ticketId: "TICKET12345"
    },
    {
      id: 2,
      userName: "Sara Ali",
      gameName: "Free Fire",
      amount: 300,
      status: "Pending",
      paymentDate: "2024-03-02",
      ticketId: "TICKET12346"
    },
    // Add more sample tickets if needed
  ]);

  // Function to handle ticket approval
  const approveTicket = (ticketId) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: 'Approved' } : ticket
    ));
  };

  // Function to handle ticket rejection
  const rejectTicket = (ticketId) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: 'Rejected' } : ticket
    ));
  };

  // Function to handle sorting by date
  const handleSortByDate = () => {
    setTickets([...tickets].sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Ticket Management</h1>
        <button onClick={handleSortByDate} className="flex items-center bg-blue-500 text-white py-2 px-4 rounded">
          Sort by Date <FaSort className="ml-2" />
        </button>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">User Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Game</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td className="px-6 py-4">{ticket.userName}</td>
                <td className="px-6 py-4">{ticket.gameName}</td>
                <td className="px-6 py-4">${ticket.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${ticket.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ticket.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => approveTicket(ticket.id)}
                      className="text-green-500 hover:text-green-700"
                      disabled={ticket.status !== 'Pending'}
                    >
                      <FaCheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => rejectTicket(ticket.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={ticket.status !== 'Pending'}
                    >
                      <FaTimesCircle className="w-5 h-5" />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketManagement;

import React from "react";
import { useSelector } from "react-redux";

const Tickets = () => {
  const tickets = useSelector((state) => state.tickets.tickets);

  if (tickets.length === 0) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-xl">
            No tickets available. Buy a ticket to see it here!
          </p>
        </div>
      );
  }

  return (
    <>
      <Navbar navcolor="bg-white" />
      <div className="min-h-screen bg-black text-white">
        <main className="max-w-4xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
            My Tickets
          </h1>
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-[#222] p-6 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">{ticket.title}</h2>
                  <p className="text-gray-400">Name: {ticket.userName}</p>
                  <p className="text-gray-400">Email: {ticket.email}</p>
                  <p className="text-gray-400">Price: Rs {ticket.price}</p>
                  <p className="text-gray-400">
                    Payment Method: {ticket.paymentMethod}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer footercolor="bg-white" footertext="text-blac" />
    </>
  );
};

export default Tickets;

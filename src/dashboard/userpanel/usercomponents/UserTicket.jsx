import { useState } from "react";
import { useSelector } from "react-redux";
import { Download, Eye } from "lucide-react";
import GameTicket from "../../../components/GameTicket";
import html2pdf from "html2pdf.js"; // Import html2pdf

export default function UserTicket() {
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

  // Handle downloading a ticket as a PDF
  const handleDownloadTicket = () => {
    const ticketElement = document.getElementById(`ticket-${viewTicket.id}`);
    
    if (ticketElement) {
      // Use html2pdf to generate the PDF from the ticket element
      html2pdf()
        .from(ticketElement)
        .save(`${viewTicket.title}_Ticket.pdf`);
    } else {
      alert("Error: Unable to capture the ticket content.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Page Header */}
      <div className="shadow-md rounded-lg py-6 px-4 mb-8 bg-white">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">My Tickets</h1>
        <p className="text-gray-500 mt-2">
          View all the tickets you've purchased below.
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
                <div className="mt-2 space-y-1">
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Date:</span> {ticket.date}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Venue:</span> {ticket.venue}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleViewTicket(ticket)}
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                >
                  <Eye className="w-4 h-4" />
                  View Ticket
                </button>
                <button
                  onClick={handleDownloadTicket} // Trigger the download
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Download Ticket
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">No Tickets Found</h2>
            <p className="text-gray-500 mt-2">You haven't purchased any tickets yet.</p>
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      {viewTicket && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="relative w-full">
            {/* Close Button */}
            <button
              onClick={handleCloseTicket}
              className="absolute right-96 -top-20 text-white hover:text-gray-200 text-4xl"
            >
              ×
            </button>

            {/* Ticket Details */}
            {/* <div id={`ticket-${viewTicket.id}`} className="bg-white rounded-lg flex justify-center p-4"> */}
              <GameTicket
                gameCoverImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171279630-wH3qmn3ecFTe9TU5qb8cnYMIb69RXt.png"
                gameTitle={viewTicket.title}
                ticketNumber={viewTicket.id}
                name={viewTicket.userName}
                email={viewTicket.email}
                phoneNumber={viewTicket.phoneNumber}
                location={viewTicket.location}
                qrCodeImage="/placeholder.svg?height=100&width=100"
              />
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModrenTicket from "../components/ModrenTicket";
import { ChevronRight } from "lucide-react";

const PaymentSuccessful = () => {
  // Fetch the latest ticket (most recent ticket added) from the tickets slice
  const tickets = useSelector((state) => state.tickets.tickets);
  const latestTicket = tickets[tickets.length - 1]; // Get the last ticket

  if (!latestTicket) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">
          No tickets available. Please purchase a ticket first.
        </p>
      </div>
    );
  }

  // Destructure ticket details from the latest ticket
  const {
    title,
    price,
    date,
    time,
    venue,
    organizer,
    userName,
    phoneNo,
  } = latestTicket;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-20">
        {/* Progress Bar */}
        <div className="w-full flex items-center justify-center py-8">
          <div className="flex items-center md:space-x-6 space-x-1">
            {/* Select */}
            <div className="flex flex-col items-center">
              <div className="md:w-8 md:h-8 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                ✓
              </div>
              <p className="text-sm mt-2">Select</p>
            </div>
            <div className="w-16 h-[2px] bg-blue-500" />
            {/* Checkout */}
            <div className="flex flex-col items-center">
              <div className="md:w-8 md:h-8 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                ✓
              </div>
              <p className="text-sm mt-2">Payment</p>
            </div>
            <div className="w-16 h-[2px] bg-blue-500" />
            {/* Get Ticket */}
            <div className="flex flex-col items-center">
              <div className="md:w-8 md:h-8 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                ✓
              </div>
              <p className="text-sm mt-2">Get Ticket</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            You got your ticket. Download it here.
          </p>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Congratulations!</h1>
            <p className="text-gray-600 mb-8">You've Successfully purchased the ticket for:</p>
            <hr/>
            {/* First Item Details */}
            <div className="mb-8 mt-5">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Item Details</h2>
              <div className="space-y-3">
                <div className="flex gap-5">
                  <span className="text-gray-600 font-bold">Item:</span>
                  <span className="text-gray-900">{ latestTicket.title}</span>
                </div>
                <div className="flex gap-5">
                  <span className="text-gray-600 font-bold">Quantity:</span>
                  <span className="text-gray-900">1 Ticket</span>
                </div>
                <div className="flex gap-5">
                  <span className="text-gray-600 font-bold">Amount:</span>
                  <span className="text-gray-900">Rs { latestTicket.price }</span>
                </div>
              </div>
            </div>

            <hr/>

            {/* Customer Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-5 ">Customer details</h2>
              <div className="space-y-3">
                <div className="flex gap-5">
                  <span className="text-gray-600 font-bold">Name:</span>
                  <span className="text-gray-900">{ latestTicket.userName }</span>
                </div>
                <div className="flex gap-5">
                  <span className="text-gray-600 font-bold">Contact Number:</span>
                  <span className="text-gray-900">{ latestTicket.phoneNo }</span>
                </div>
                <div className="flex gap-5">
                  <span className="text-gray-600 font-bold">Email Address:</span>
                  <span className="text-gray-900">{ latestTicket.email }</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">Download Your Tickets!</h2>
            </div>

            {/* Ticket Component */}
            <div className="mb-6">
              <ModrenTicket
                gameCoverImage={latestTicket.coverImage}
                gameTitle={latestTicket.title}
                ticketNumber={latestTicket.ticketNumber}
                name={latestTicket.userName}
                phoneNumber={latestTicket.phoneNo}
                location={latestTicket.venue}
                qrCodeImage="/placeholder.svg?height=100&width=100"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Download Ticket
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">
                Share Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccessful;

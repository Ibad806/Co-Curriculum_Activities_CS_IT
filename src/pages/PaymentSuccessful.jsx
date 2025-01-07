import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  // Destructure ticket details
  const {
    title,
    price,
    image,
    date,
    time,
    organizer,
    venue,
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

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full md:w-1/2 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Ticket Details</h3>
            <div className="flex flex-col items-start space-y-4">
              <p className="text-sm">
                <span className="font-bold">Game: </span>
                {title}
              </p>
              <p className="text-sm">
                <span className="font-bold">Price: </span>
                Rs {price}
              </p>
              <p className="text-sm">
                <span className="font-bold">Date: </span>
                {date}
              </p>
              <p className="text-sm">
                <span className="font-bold">Time: </span>
                {time}
              </p>
              <p className="text-sm">
                <span className="font-bold">Venue: </span>
                {venue}
              </p>
              <p className="text-sm">
                <span className="font-bold">Organizer: </span>
                {organizer}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
            <div className="flex flex-col items-start space-y-4">
              <p className="text-sm">
                <span className="font-bold">Name: </span>
                {userName}
              </p>
              <p className="text-sm">
                <span className="font-bold">Phone No: </span>
                {phoneNo}
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6">Download Your Ticket</h3>
            <div className="mt-6 flex justify-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={image}
                  alt="Ticket"
                  className="w-full h-64 rounded-lg object-cover"
                />
                <div className="mt-4">
                  <p className="text-sm">Ticket ID: #{latestTicket.id}</p>
                  <p className="text-sm">Game: {title}</p>
                  <p className="text-sm">Price: Rs {price}</p>
                  <p className="text-sm">Venue: {venue}</p>
                  <p className="text-sm">Date: {date}</p>
                  <p className="text-sm">Time: {time}</p>
                </div>
                <div className="mt-4 flex space-x-4">
                  <button className="w-[100px] text-sm px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                    Download Ticket
                  </button>
                  <Link to='/tickets'>
                    <button className="w-[100px] text-sm px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600">
                      View Ticket
                    </button>
                  </Link>
                </div>
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

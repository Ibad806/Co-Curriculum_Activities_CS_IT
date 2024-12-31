import React, { useState } from "react";
import image from "../assets/smec_banner.png";

const Gamedetails = () => {
  
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <main className="max-w-4xl mx-auto px-4">
          {/* Game Image Section */}
          <div className="relative pt-4">
            <div className="border-8 p-2 border-[#393939] rounded-[30px]">
              <img
                src={image}
                alt="FC 25 Game"
                className="w-full h-[280px] md:h-[55vh] rounded-lg object-cover"
              />
            </div>
            <div className="h-[70px] flex items-center md:justify-center justify-start pl-2 md:pl-0 relative bg-[#393939] mt-[20px] rounded-[10px]">
              <h1 className="text-[20px] md:text-[30px]">PUBG</h1>
              <button className="absolute right-3 bg-[#FFCD5A] p-3 rounded-[20px] text-black text-[10px] md:text-[14px] font-bold">
                Buy Ticket →
              </button>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">
              Pubg Game Description:
            </h2>
            <p className="text-sm md:text-lg">
              Pubg is the cutting-edge installment in EA Sports' renowned
              football simulation series, taking the experience to new heights.
              With enhanced AI, hyper-realistic graphics, and improved player
              animations, FC 25 offers unparalleled immersion. The game features
              updated rosters, new tactical options, and expanded modes such as
              Career, Ultimate Team, and Volta. Whether you're managing a team
              to glory or competing online, FC 25 combines strategy, skill, and
              the thrill of football to captivate players of all levels.
            </p>
          </section>

          {/* Game Details */}
          <section className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="p-4 rounded-lg shadow-md flex-1 border border-gray-600">
              <div className="border-b border-gray-600 mb-4 pb-2">
                <h3 className="text-xl font-semibold text-center">
                  Game Details
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm">Platform: PlayStation</li>
                <li className="text-sm">Game Format: 1v1</li>
                <li className="text-sm">Rules & Guidelines: Standard</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md flex-1 border border-gray-600">
              <div className="border-b border-gray-600 mb-4 pb-2">
                <h3 className="text-xl font-semibold text-center">Schedule</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm">Date: 15 Jan 2025</li>
                <li className="text-sm">Time: 11:30 AM</li>
                <li className="text-sm">Duration: 8 Minutes</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md flex-1 border border-gray-600">
              <div className="border-b border-gray-600 mb-4 pb-2">
                <h3 className="text-xl font-semibold text-center">Location</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm">
                  Venue: Sir Syed University of Engineering and Technology
                </li>
              </ul>
            </div>
          </section>
          {/* Ticket Information Section */}
          <div className="border-4 p-2 border-[#393939] rounded-[55px] mt-8">
            <div className="w-full bg-[#393939] rounded-[50px] p-4 ">
              <h2 className="text-[25px] font-medium text-center">
                Ticket Information
              </h2>
            </div>
          </div>
          <section className="mt-8 p-6 rounded-[30px] shadow-md border-[#393939] border-4">
            <div className="pt-6 relative">
              <div className="flex items-center justify-between">
                <h3 className="md:text-lg sm:text-sm font-medium pb-9">
                  Ticket Price:
                </h3>
                <p className="text-gray-300 text-sm pb-9">Rs 1000</p>
              </div>
              <div className="flex items-center justify-center bg-[#393939] absolute right-0 w-[100px] h-[40px] rounded-[30px]">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-lg cursor-pointer">-</h1>
                  <h1 className="text-lg">0</h1>
                  <h1 className="text-lg cursor-pointer">+</h1>
                </div>
              </div>
              <div className="flex items-center justify-between mt-16">
                <h3 className="text-lg font-medium py-[20px]">
                  Registration Deadline:
                </h3>
                <p className="text-gray-300 text-sm">20 Jan 2025</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">
                Refund/Cancellation Policy
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                Refunds are available for cancellations made at least 48 hours
                before the event start time. To request a refund, participants
                must email support@msceuniversity.com with their ticket details
                and reason for cancellation. Refunds will be processed within
                7-10 business days, subject to a 5% processing fee.
                Cancellations made less than 48 hours before the event,
                no-shows, or disqualifications are not eligible for refunds. In
                the case of event postponement or cancellation, ticket holders
                will be notified and offered a refund or the option to transfer
                their ticket to the rescheduled event.
              </p>
            </div>
            <div className="text-center mt-6">
              <button className="bg-[#FFCD5A] text-black px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-yellow-400">
                Checkout
              </button>
            </div>
          </section>
        </main>
      </div>{" "}
    </>
  );
};

export default Gamedetails;

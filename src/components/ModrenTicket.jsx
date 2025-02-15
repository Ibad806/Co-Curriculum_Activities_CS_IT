import React from "react";

export default function ModrenTicket({
  gameCoverImage,
  gameTitle,
  ticketNumber,
  name,
  phoneNumber,
  location,
  qrCodeImage
}) {
  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-[#1a1a1a] rounded-[24px] overflow-hidden shadow-xl relative">
        {/* Main ticket image section */}
        <div className="relative">
          {/* Game cover image */}
          <div className="relative w-full aspect-square">
            <img
              src={gameCoverImage}
              alt={gameTitle}
              className="object-cover w-full h-full"
            />

            {/* Game title overlay */}
            <div className="absolute top-0 left-0 right-0 p-4">
              <div className="text-white">
                <h1 className="text-lg font-bold tracking-wider text-center">
                  {gameTitle}
                </h1>
              </div>
            </div>
          </div>

          {/* Dashed separator line */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="border-b-2 border-dashed border-white/30 mx-8" />
          </div>

          {/* Circular cutouts */}
          <div className="absolute -bottom-4 left-0 w-8 h-8 bg-gray-100 rounded-full transform translate-x-[-50%]" />
          <div className="absolute -bottom-4 right-0 w-8 h-8 bg-gray-100 rounded-full transform translate-x-[50%]" />
        </div>

        {/* Ticket information section */}
        <div className="bg-[#1a1a1a] text-white p-6 pt-8">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div>
                <p className="text-[16px] font-medium">Ticket: #{ticketNumber}</p>
              </div>
              <div>
                <p className="text-[16px] font-medium">Name: {name}</p>
              </div>
              <div>
                <p className="text-[16px] font-medium">Phone no: {phoneNumber}</p>
              </div>
              <div>
                <p className="text-[16px] font-medium">Location: {location}</p>
              </div>
            </div>

            {/* QR Code */}
            <div>
              <img
                src={qrCodeImage}
                alt="QR Code"
                width={100}
                height={100}
                className="bg-white rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import topheader from '../assets/image 35.png'
import SMEC25Logo from '../assets/smec logo.png'
import footer from '../assets/ticket footer.png'

export default function GameTicket({
  gameCoverImage,
  gameTitle,
  ticketNumber,
  name,
  email,
  phoneNumber,
  location,
  qrCodeImage
}) {
  return (
    <div className="w-[900px] mx-auto bg-white">
      {/* Top geometric pattern */}
      <div className="relative h-20 ">
        <img
          src={topheader}
          alt="Decorative header"
          className="object-cover bg-transparent w-full"
        />
      </div>

      {/* Main ticket content */}
      <div className="p-5 flex items-center gap-8">
        {/* Left side - Logo */}
        <div className="w-48">
          <img
            src={SMEC25Logo}
            alt="SMEC'25 Logo"
            width={200}
            height={200}
            className="w-full"
          />
        </div>

        {/* Center - Game cover */}
        <div className="w-64">
          <img
            src={gameCoverImage}
            alt={gameTitle}
            width={256}
            height={320}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right side - Event details and QR */}
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <h3 className="font-bold text-gray-800">Ticket Number:</h3>
              <p className="text-gray-600">{ticketNumber}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Competition:</h3>
              <p className="text-gray-600">{gameTitle}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">University:</h3>
              <p className="text-gray-600">Sir syed{location}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Contact:</h3>
              <p className="text-gray-600">034123{phoneNumber}</p>
            </div>
            <div className="col-span-2 ">
              <h3 className="font-bold text-gray-800">E-mail:</h3>
              <p className="text-gray-600">abc@gmail.com{email}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mt-4">
            <img
              src={qrCodeImage}
              alt="QR Code"
              width={100}
              height={100}
              className="border border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Bottom social media footer */}
      <div className="relative h-16">
        <img
          src={footer}
          alt="Social media footer"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}

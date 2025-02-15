import React from 'react'

export default function GameTicket() {
  return (
    <div className="max-w-[900px] mx-auto bg-white">
      {/* Top geometric pattern */}
      <div className="relative h-16">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2035-uGKrP8x26NrxHKYdMZf7AH1IzxOqzZ.png"
          alt="Decorative header"
          className="object-cover"
        />
      </div>

      {/* Main ticket content */}
      <div className="p-8 flex items-center gap-8">
        {/* Left side - Logo */}
        <div className="w-48">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2035%20(1)-3vJTkJT1cVvmTDF7HAN5cv3DyMBNTe.png"
            alt="SMEC'25 Logo"
            width={200}
            height={200}
            className="w-full"
          />
        </div>

        {/* Center - Game cover */}
        <div className="w-64">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171279630-wH3qmn3ecFTe9TU5qb8cnYMIb69RXt.png"
            alt="FC 25 Game Cover"
            width={256}
            height={320}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right side - Event details and QR */}
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <h3 className="font-bold text-gray-800">Team:</h3>
              <p className="text-gray-600"></p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Competition:</h3>
              <p className="text-gray-600">FC25</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">University:</h3>
              <p className="text-gray-600">SSUET</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Contact:</h3>
              <p className="text-gray-600">98 935-498 28 65</p>
            </div>
            <div className="col-span-2">
              <h3 className="font-bold text-gray-800">E-mail:</h3>
              <p className="text-gray-600">rameez123@gmail.com</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-end mt-4">
            <img
              src="/placeholder.svg?height=100&width=100"
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
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2036-cquYzRGopqYDCEmoQctS6blsv07DH8.png"
          alt="Social media footer"
          className="object-cover"
        />
      </div>
    </div>
  )
}


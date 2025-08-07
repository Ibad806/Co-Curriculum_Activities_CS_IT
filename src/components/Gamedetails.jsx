import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Gamedetails = () => {
  const navigate = useNavigate();
  const selectedGame = useSelector((state) => state.game.selectedGame);

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">
          No game selected. Please choose a game to view details!
        </p>
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1);

  console.log("Selected Game:", selectedGame);
  

  const {
    title,
    image,
    gamedesc,
    price,
    date,
    time,
    playerslot,
    registrationDeadline,
    organizer,
    venue,
    rules,
    genre,
    ageRating,
    ContactNumber,
  } = selectedGame;

  const ticketPrice = 100;

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const totalPrice = ticketPrice * quantity;

  const handleCheckout = () => {
    navigate("/payment"); // Redirect to payment page
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <main className="mx-auto md:px-28 px-4">
          {/* Game Image Section */}
          <div className="relative pt-4">
            <div className="border-8 p-2 border-[#393939] rounded-[30px] mt-28">
              <img
                src={image}
                alt={title}
                className="w-full h-[280px] md:h-[60vh] rounded-lg object-cover"
              />
            </div>
            <div className="h-[70px] flex items-center md:justify-center justify-start pl-2 md:pl-0 relative bg-[#393939] mt-[20px] rounded-[10px]">
              <h1 className="text-[20px] md:text-[30px]">{title}</h1>
              <button
                onClick={handleCheckout}
                className="absolute right-3 bg-[#211D70] p-3 rounded-[20px] text-black text-[10px] md:text-[14px] font-bold"
              >
                Buy Ticket →
              </button>
            </div>
          </div>

          {/* Game Description */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Game Description:</h2>
            <p className="text-sm md:text-lg">{gamedesc}</p>
          </section>

          <div className="border-4 p-2 border-[#393939] rounded-[55px] mt-8">
            <div className="w-full bg-[#393939] rounded-[50px] p-4 ">
              <h2 className="text-[25px] font-medium text-center">
                Ticket Information
              </h2>
            </div>
          </div>

          {/* Game Details Section */}
          <section className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="p-4 rounded-lg shadow-md flex-1 border border-gray-600">
              <div className="border-b border-gray-600 mb-4 pb-2">
                <h3 className="text-xl font-semibold text-center">
                  Game Details
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm">Ticket: {price}</li>
                <li className="text-sm">Player: {playerslot}</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md flex-1 border border-gray-600">
              <div className="border-b border-gray-600 mb-4 pb-2">
                <h3 className="text-xl font-semibold text-center">Schedule</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm">Date: {date}</li>
                <li className="text-sm">Time: {time}</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md flex-1 border border-gray-600">
              <div className="border-b border-gray-600 mb-4 pb-2">
                <h3 className="text-xl font-semibold text-center">Location</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm">Venue: {venue}</li>
                <li className="text-sm">Contact: {ContactNumber}</li>
              </ul>
            </div>
          </section>

            <div className="text-center mt-6">
              <button
                onClick={handleCheckout}
                className="bg-[#211D70] text-black px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-yellow-400"
              >
                Checkout
              </button>
            </div>
        </main>
      </div>
    </>
  );
};

export default Gamedetails;

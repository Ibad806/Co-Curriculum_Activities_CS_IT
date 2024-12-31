import React, { useState } from "react";
import image from "../assets/smec_banner.png";

const Gamedetails = () => {
  const [quantity, setQuantity] = useState(1);
  const ticketPrice = 1000; // Price per ticket

  // Function to handle increment
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to handle decrement
  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  // Calculate total price
  const totalPrice = ticketPrice * quantity;

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

          {/* Ticket Information Section */}
          <section className="mt-8 p-6 rounded-[30px] shadow-md border-[#393939] border-4">
            <div className="pt-6">
              <div className="flex items-center justify-between">
                <h3 className="md:text-lg sm:text-sm font-medium pb-9">
                  Ticket Price:
                </h3>
                <p className="text-gray-300 text-sm pb-9">Rs {ticketPrice}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrementQuantity}
                    className="text-lg bg-[#FFCD5A] text-black w-[40px] h-[40px] rounded-[50%]"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="text-lg bg-[#FFCD5A] text-black w-[40px] h-[40px] rounded-[50%]"
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-semibold">
                  Total Price: Rs {totalPrice}
                </p>
              </div>
              <div className="flex items-center justify-between mt-16">
                <h3 className="text-lg font-medium py-[20px]">
                  Registration Deadline:
                </h3>
                <p className="text-gray-300 text-sm">20 Jan 2025</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <button className="bg-[#FFCD5A] text-black px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-yellow-400">
                Checkout
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Gamedetails;

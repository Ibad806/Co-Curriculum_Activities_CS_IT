import React, { useState } from "react";
import image from "../assets/smec_banner.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Gamedetails = () => {
  const { category } = useParams();

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

  const {
    title,
    image,
    gamedesc,
    price,
    date,
    time,
    winprice,
    playerslot,
    registrationDeadline,
    organizer,
    venue,
    rules,
  } = selectedGame;

  const ticketPrice = parseInt(price.replace(",", ""), 10) || 0;

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const totalPrice = ticketPrice * quantity;

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <main className="mx-auto md:px-28 px-4">
          {/* Game Image Section */}
          <div className="relative pt-4">
            <div className="border-8 p-2 border-[#393939] rounded-[30px] mt-28">
              <img
                src={image}
                alt="FC 25 Game"
                className="w-full h-[280px] md:h-[60vh] rounded-lg object-cover"
              />
            </div>
            <div className="h-[70px] flex items-center md:justify-center justify-start pl-2 md:pl-0 relative bg-[#393939] mt-[20px] rounded-[10px]">
              <h1 className="text-[20px] md:text-[30px]">{title}</h1>
              <button className="absolute right-3 bg-[#FFCD5A] p-3 rounded-[20px] text-black text-[10px] md:text-[14px] font-bold">
                Buy Ticket →
              </button>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Game Description:</h2>
            <p className="text-sm md:text-lg">{gamedesc}</p>
          </section>

          <section className="mt-8 p-6 rounded-[30px] shadow-md border-[#393939] border-4">
            <div className="pt-6">
              <div className="flex items-center justify-between">
                <h3 className="md:text-lg sm:text-sm font-medium pb-9">
                  Ticket Price:
                </h3>
                <p className="text-gray-300 text-sm pb-9">Rs {price}</p>
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
                <p className="text-gray-300 text-sm">{registrationDeadline}</p>
              </div>
              <p className="text-sm md:text-lg">
                Refunds are available for cancellations made at least 48 hours
                before the event start time. To request a refund, participants
                must email support@smecuniversity.com with their ticket details
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
      </div>
    </>
  );
};

export default Gamedetails;

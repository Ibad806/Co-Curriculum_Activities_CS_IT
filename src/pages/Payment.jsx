import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTicket } from "../redux/ticketsSlice";
import { useSelector } from "react-redux";

const Payment = () => {
  const selectedGame = useSelector((state) => state.game.selectedGame);

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl font-semibold">
          No game selected for payment. Please go back and select a game.
        </p>
      </div>
    );
  }

  const { title, price, image } = selectedGame;
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Please select a payment method and agree to the terms.");
      return;
    }

    // Create a ticket
    const ticket = {
      id: Date.now(), // Unique ID
      userName,
      email,
      title,
      price,
      paymentMethod: selectedMethod,
    };

    // Dispatch the ticket to the Redux store
    dispatch(addTicket(ticket));

    alert(`Payment successful for ${title}. Ticket generated!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Payment Form */}
      <main className="max-w-5xl mx-auto p-6 space-y-10">
        {/* Game and Payment Details */}
        <h1 className="text-4xl font-bold text-center text-yellow-400">
          Checkout
        </h1>
        <div className="bg-[#222] p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Game Details
          </h2>
          <p className="text-lg">Game: {title}</p>
          <p className="text-lg">Price: Rs {price}</p>
        </div>

        {/* User Information */}
        <div className="bg-[#222] p-6 rounded-lg shadow-lg">
          <label className="block text-lg font-semibold">Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 rounded-lg bg-[#111] text-white mt-2"
          />
          <label className="block text-lg font-semibold mt-4">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg bg-[#111] text-white mt-2"
          />
        </div>

        {/* Payment Method */}
        <div className="bg-[#222] p-6 rounded-lg shadow-lg">
          <label className="block text-lg font-semibold mb-4">
            Select Payment Method:
          </label>
          {["Easypaisa", "JazzCash", "Bank Transfer"].map((method) => (
            <button
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-2 ${
                selectedMethod === method
                  ? "bg-yellow-400 text-black"
                  : "bg-[#111] text-white"
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Complete Payment */}
        <div className="text-center">
          <button
            onClick={handlePayment}
            disabled={!userName || !email || !selectedMethod}
            className="bg-yellow-400 px-8 py-3 rounded-lg text-black font-bold shadow-lg"
          >
            Complete Payment
          </button>
        </div>
      </main>
    </div>
  );
};

export default Payment;

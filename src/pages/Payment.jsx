import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTicket } from "../redux/ticketsSlice";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import easypaisa from '../assets/easypaisalogo.png'

const Payment = () => {
  const selectedGame = useSelector((state) => state.game.selectedGame);

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">
          No game selected for payment. Please go back and select a game.
        </p>
      </div>
    );
  }

  const { title, price, image, date, time, organizer, venue } = selectedGame;
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Easypaisa and Credit Card-specific details
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handlePayment = () => {
    if (!selectedMethod || !agreeTerms) {
      alert("Please select a payment method and agree to the terms.");
      return;
    }

    if (selectedMethod === "Easypaisa" && !accountNumber) {
      alert("Please enter your Easypaisa account number.");
      return;
    }

    if (
      selectedMethod === "Credit Card" &&
      (!cardNumber || !expiryDate || !cvv || !nameOnCard)
    ) {
      alert("Please fill out all Credit Card details.");
      return;
    }

    // Create a ticket
    const ticket = {
      id: Date.now(),
      userName,
      rollNo,
      title,
      price,
      paymentMethod: selectedMethod,
      date,
      time,
      organizer,
      venue,
    };

    // Dispatch the ticket to the Redux store
    dispatch(addTicket(ticket));

    alert(`Payment successful for ${title}. Ticket generated!`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-28">
        {/* Progress Bar */}
        <div className="w-full flex items-center justify-center py-6 px-4 md:px-0">
          <div className="flex items-center justify-between w-full max-w-xs md:max-w-md lg:max-w-lg space-x-3 md:space-x-6">
            {/* Select */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm md:text-base">
                ✓
              </div>
              <p className="text-xs md:text-sm mt-2">Select</p>
            </div>
            <div className="w-10 h-[2px] md:w-16 bg-blue-500" />
            {/* Checkout */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-400 text-sm md:text-base">
                2
              </div>
              <p className="text-xs md:text-sm mt-2">Checkout</p>
            </div>
            <div className="w-10 h-[2px] md:w-16 bg-gray-400" />
            {/* Get Ticket */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-400 text-sm md:text-base">
                3
              </div>
              <p className="text-xs md:text-sm mt-2">Get Ticket</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col">
          <h4 className="py-4">Payment</h4>
          <h6>Fill Out Necessary Information here. </h6>
        </div>

        {/* Payment Section */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full md:w-1/2 rounded-lg p-6 flex flex-col justify-between h-full">
            <h3 className="text-xl font-semibold mb-6">Your Ticket</h3>
            <div className="flex flex-col">
              <img
                src={image}
                alt={title}
                className="w-full h-80 rounded-lg object-cover mb-4"
              />
              <h5 className="font-bold text-center py-3">{title}</h5>
              <p className="text-sm md:text-lg mt-2">
                Date: {date}, Time: {time}
              </p>
              <p className="text-sm md:text-lg mt-1">Price: Rs {price}</p>
              <p className="text-sm md:text-lg mt-1">Venue: {venue}</p>
              <p className="text-sm md:text-lg mt-1">
                Organizer: {organizer}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Payment Details</h3>
            {/* User Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Roll No
                </label>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="Enter your roll number (optional)"
                  className="w-full p-3 border rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="flex items-center md:gap-6 gap-1">
                {/* Easypaisa Option */}
                <label className="flex items-center md:gap-3 md:px-4 gap-1 px-2 py-3 rounded-lg cursor-pointer shadow-sm hover:border-gray-500 transition duration-200">
                  <img
                    src={easypaisa} // Replace with Easypaisa logo URL
                    alt="Easypaisa"
                    className="md:w-8 md:h-8 w-4 h-4 object-contain"
                  />
                  <span className="text-gray-700 md:font-medium text-sm md:px-2">Easypaisa</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Easypaisa"
                    onChange={() => setSelectedMethod("Easypaisa")}
                    className="ml-auto mx-2 w-5 h-5 accent-gray-700 cursor-pointer"
                  />
                </label>

                {/* Credit Card Option */}
                <label className="flex items-center gap-1 px-2 md:gap-3 md:px-4 py-3 rounded-lg cursor-pointer shadow-sm hover:border-gray-500 transition duration-200">
                  <img
                    src={easypaisa} // Replace with Credit Card logo URL
                    alt="Credit Card"
                    className="w-4 h-4 md:w-8 md:h-8 object-contain"
                  />
                  <span className="text-gray-700 text-sm md:font-medium ">Credit Card</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit Card"
                    onChange={() => setSelectedMethod("Credit Card")}
                    className="ml-auto w-5 h-5 accent-gray-700 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Easypaisa Details */}
            {selectedMethod === "Easypaisa" && (
              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-700">
                  Please ensure your Easypaisa account is active and has
                  sufficient balance.
                </p>
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="XXXX XXXX XXXX"
                    className="w-full p-3 border rounded-lg focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Credit Card Details */}
            {selectedMethod === "Credit Card" && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full p-3 border rounded-lg focus:outline-none"
                  />
                </div>
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full p-3 border rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="XXX"
                      className="w-full p-3 border rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 border rounded-lg focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Terms and Agreement */}
            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400 focus:ring-offset-gray-200 focus:ring-2"
              />
              <label htmlFor="agreeTerms" className="ml-2 text-sm">
                By clicking this, I agree to the{" "}
                <a href="/privacy-policy" className="text-blue-500 underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Complete Payment */}
            <div className="mt-6 text-center">
              <button
                onClick={handlePayment}
                disabled={!userName || !selectedMethod || !agreeTerms}
                className={`px-8 py-3 rounded-lg text-lg font-bold w-full ${
                  !userName || !selectedMethod || !agreeTerms
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Pay Rs {price}
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Payment;

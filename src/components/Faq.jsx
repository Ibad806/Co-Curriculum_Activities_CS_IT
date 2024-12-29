import React, { useState } from "react";
import message from "../assets/vector.png";
import phone from "../assets/phone-telephone.png";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "I haven’t received any order confirmation yet. Did my booking go through?",
      answer: "Lorem ipsum dolor sit amet consectetur. Eleifend nunc habi loremut egestas.",
    },
    {
      question: "I am not able/do not want to attend an already booked event for personal reasons. Is there a possibility to cancel/rebook the tickets?",
      answer: "You can contact our help center for assistance with cancellations or rebooking.",
    },
    {
      question: "I lost my e-Ticket. What can I do?",
      answer: "You can retrieve your e-Ticket by logging into your account or contacting support.",
    },
    {
      question: "An event was canceled/postponed/relocated, and I am not able/do not want to attend the event. Is it possible to cancel my tickets?",
      answer: "Yes, tickets can be canceled under specific conditions. Reach out to our team.",
    },
    {
      question: "I’ve already ordered tickets and now want to add another one. Is it possible yet to sit together?",
      answer: "You can try booking an additional ticket close to your previous booking.",
    },
  ];

  return (
    <div className="faq-main flex flex-col md:flex-row min-h-[10vh] w-full bg-purple-50 p-4 md:p-8">
      {/* Left Section */}
      <div className="faq-left w-full md:w-1/2 flex flex-col items-start justify-center p-4 md:p-8 space-y-6">
        <h1 className="text-2xl md:text-4xl font-semibold text-purple-800">Frequently Asked Questions</h1>
        <div className="flex items-center space-x-4">
          <img src={message} alt="Email" className="w-5 h-5" />
          <p className="text-gray-700">helpcenter@ticketer.com</p>
        </div>
        <div className="flex items-center space-x-4">
          <img src={phone} alt="Phone" className="w-5 h-5" />
          <p className="text-gray-700">(010) 123-4567</p>
        </div>
        <p className="text-gray-600">Still Have Questions?</p>
        <p className="text-gray-500">
          Can’t find the answer you’re looking for? Please contact our help center.
        </p>
        <button className="px-6 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700 transition duration-300">
          Contact Us
        </button>
      </div>

      {/* Right Section */}
      <div className="faq-right w-full md:w-1/2 flex flex-col justify-center md:p-8 md:mt-0 mt-[20px] space-y-6">
        {questions.map((item, index) => (
          <div
            key={index}
            className={`faq-item border-b border-gray-300 pb-4 cursor-pointer ${
              activeIndex === index ? "bg-purple-100" : "hover:bg-purple-100"
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h6 className="text-[12px] leading-[16px] md:text-xl font-semibold text-purple-900">{item.question}</h6>
              <span
                className={`transform transition-transform ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                } text-purple-700`}
              >
                ▼
              </span>
            </div>

            {/* Answer section with transition */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 text-[11px] md:text-[15px] md:leading-[18px] leading-[15px]">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

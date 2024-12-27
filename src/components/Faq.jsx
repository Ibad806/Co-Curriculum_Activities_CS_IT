import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question:
        "I haven’t received any order confirmation yet. Did my booking go through?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Eleifend nunc habi loremut egestas.",
    },
    {
      question:
        "I am not able/do not want to attend an already booked event for personal reasons. Is there a possibility to cancel/rebook the tickets?",
      answer:
        "You can contact our help center for assistance with cancellations or rebooking.",
    },
    {
      question: "I lost my e-Ticket. What can I do?",
      answer:
        "You can retrieve your e-Ticket by logging into your account or contacting support.",
    },
    {
      question:
        "An event was canceled/postponed/relocated, and I am not able/do not want to attend the event. Is it possible to cancel my tickets?",
      answer:
        "Yes, tickets can be canceled under specific conditions. Reach out to our team.",
    },
    {
      question:
        "I’ve already ordered tickets and now want to add another one. Is it possible yet to sit together?",
      answer:
        "You can try booking an additional ticket close to your previous booking.",
    },
  ];

  return (
    <div className="faq-main flex flex-col md:flex-row min-h-[10vh] w-full bg-purple-50 p-4">
      {/* Left Section */}
      <div className="faq-left w-full md:w-1/2 flex flex-col items-start justify-center p-8 space-y-4">
        <h1>Frequently Asked Questions</h1>
        <div className="flex items-center space-x-4">
          <img src="/email-icon.png" alt="Email" className="w-6 h-6" />
          <p>helpcenter@ticketer.com</p>
        </div>
        <div className="flex items-center space-x-4">
          <img src="/phone-icon.png" alt="Phone" className="w-6 h-6" />
          <p>(010) 123-4567</p>
        </div>
        <p>Still Have Questions?</p>
        <p>
          Can’t find the answer you’re looking for? Please contact our help
          center.
        </p>
        <button className="button1">Contact Us</button>
      </div>

      {/* Right Section */}
      <div className="faq-right w-full md:w-1/2 flex flex-col justify-center p-8 space-y-6">
        {questions.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-300 pb-4"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center cursor-pointer">
              <h6 className="md:leading-[2vw]">{item.question}</h6>
              <span
                className={`transform transition-transform ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-[1.5vw] text-gray-600">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

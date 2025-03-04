import React, { useState } from "react";
import message from "../assets/Vector.png";
import phone from "../assets/phone-telephone.png";
import axios from "axios";
import { AppRoutes } from "../constant/constant";
import { notification } from 'antd';
import Cookies from "js-cookie";


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const questions = [
    { question: "I haven’t received any order confirmation yet. Did my booking go through?", answer: "Your booking confirmation may take a few minutes to arrive. Check your spam folder or contact support if needed." },
    { question: "I am not able/do not want to attend an already booked event for personal reasons. Is there a possibility to cancel/rebook the tickets?", answer: "You can contact our help center for assistance with cancellations or rebooking." },
    { question: "I lost my e-Ticket. What can I do?", answer: "You can retrieve your e-Ticket by logging into your account or contacting support." },
    { question: "An event was canceled/postponed/relocated, and I am not able/do not want to attend the event. Is it possible to cancel my tickets?", answer: "Yes, tickets can be canceled under specific conditions. Reach out to our team." },
    { question: "I’ve already ordered tickets and now want to add another one. Is it possible yet to sit together?", answer: "You can try booking an additional ticket close to your previous booking." },
  ];

  const [id, setID] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user"))._id : null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    subject: '',
    message: '',
    userID: id
  });
  const [submitting, setSubmitting] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(AppRoutes.contact, formData);

      notification.success({
        message: 'Success',
        description: 'Message sent successfully!',
        placement: 'topRight'
      });

      setFormData({
        name: '',
        email: '',
        department: '',
        subject: '',
        message: '',
        userID: id
      });
      setIsModalOpen(false)
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to send message.',
        placement: 'topRight'
      });
      setIsModalOpen(false)
    }
    setSubmitting(false);
  };

  return (
    <div className="faq-main flex flex-col md:flex-row min-h-[10vh] w-full p-4 md:p-8">
      {/* Left Section */}
      <div className="faq-left w-full md:w-[30%] flex flex-col items-start px-4 md:px-8 space-y-6">
        <h1 className="text-2xl md:text-4xl font-semibold">Frequently Asked Questions</h1>
        <div className="flex items-center space-x-4">
          <img src={message} alt="Email" className="w-5 h-5" />
          <p className="text-gray-700 text-[12px] md:text-[17px]">helpcenter@ticketer.com</p>
        </div>
        <div className="flex items-center space-x-4">
          <img src={phone} alt="Phone" className="w-5 h-5" />
          <p className="text-gray-700 text-[12px] md:text-[17px]">(010) 123-4567</p>
        </div>
        <p className="text-gray-600 text-[12px] md:text-[17px]">Still Have Questions?</p>
        <p className="text-gray-500 text-[12px] md:text-[17px] leading-4">Can’t find the answer you’re looking for? Please contact our help center.</p>
        <button
          onClick={openModal}
          className="px-6 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700 transition duration-300">
          Contact Us
        </button>
      </div>

      {/* Right Section */}
      <div className="faq-right w-full md:w-[70%] flex flex-col justify-center md:px-8 md:mt-0 mt-[20px] space-y-6 px-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className={`faq-item border-b border-gray-300 rounded-xl p-4 cursor-pointer ${activeIndex === index ? "bg-purple-100" : "hover:bg-purple-100"
              }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h6 className="text-[12px] leading-[16px] md:text-xl font-semibold">{item.question}</h6>
              <span
                className={`transform transition-transform ${activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
              >
                ▼
              </span>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
              <p className="text-gray-600 text-[11px] md:text-[15px] md:leading-[18px] leading-[15px]">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] md:w-[50%] p-6 rounded-lg shadow-lg transform transition-transform animate-slideIn">
            <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="name"
                id="name"
                name="name"
                value={formData.name} placeholder="Name" onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="email"
                id="email"
                name="email"
                value={formData.email} placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="department"
                id="department"
                name="department"
                value={formData.department} placeholder="Department" onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="subject"
                id="subject"
                name="subject"
                value={formData.subject} placeholder="Subject" onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <textarea id="message"
                name="message"
                value={formData.message} placeholder="Message" onChange={handleChange} rows="4" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700 transition duration-300" disabled={submitting}> {submitting ? 'Sending...' : 'Send Message'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;

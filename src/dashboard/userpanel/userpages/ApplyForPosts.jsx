import React, { useState } from "react";

const ApplyforPosts = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    phone: "",
    position: "",
    additionalDetails: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positions = [
    "General Manager",
    "Executive Manager",
    "Sales Manager",
    "Event Coordinator",
    "Technical Head",
    "Marketing Manager",
    "Logistics Manager",
    "Security Head",
    "Finance Manager",
    "Media Manager",
    "Volunteer Coordinator",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Submitted: ", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Apply for SMEC Posts</h1>
        <p className="text-gray-500 mt-2">
          Submit your application for the available positions in SMEC.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center shadow-md">
          <h2 className="text-xl font-semibold">Application Submitted!</h2>
          <p className="mt-2">Thank you for applying. We will contact you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rollNumber" className="block text-gray-700 font-medium mb-2">
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your roll number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>
                Select a position
              </option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="additionalDetails" className="block text-gray-700 font-medium mb-2">
              Additional Details (Optional)
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Share any additional details or experience"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyforPosts;

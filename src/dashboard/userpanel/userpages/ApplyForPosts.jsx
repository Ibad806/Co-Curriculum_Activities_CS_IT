import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "../../../constant/constant";

const ApplyforPosts = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    phone: "",
    email: "",
    position: "",
    subpost: "",
    additionalDetails: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [application, setApplication] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const positions = [
    "General Manager", "Executive Manager", "Sales Manager", "Event Coordinator",
    "Technical Head", "Marketing Manager", "Logistics Manager", "Security Head",
    "Finance Manager", "Media Manager", "Volunteer Coordinator",
    "E-Games", "Geek Gemes", "General Games",
  ];

  const subPostPositions = ["E-Games", "Geek Gemes", "General Games"];
  const subPostOptions = ["Lead", "Co-Lead"];
  const showSubpostField = subPostPositions.includes(formData.position);

  useEffect(() => {
    // Fetch values from cookies
    const savedName = Cookies.get("name");
    const savedEmail = Cookies.get("email");

    setFormData((prev) => ({
      ...prev,
      name: savedName || "",
      email: savedEmail || "",
    }));
  }, []);

  const checkStatus = async () => {
    try {
      const response = await axios.get(`${AppRoutes.smecpost}/application`, {
        params: { email: formData.email },
      });
      setApplication(response.data);
      setError("");
    } catch (err) {
      setApplication(null);
      setError("No application found with this email.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(AppRoutes.smecpost, formData);
      console.log("Submitted:", response.data);

      setIsSubmitted(true);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        checkStatus();
      }, 3000);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">Application Submitted!</h2>
            <p className="mt-2 text-gray-700">Thank you for applying. We will contact you soon.</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Apply for SMEC Posts</h1>
        <p className="text-gray-500 mt-2">
          Submit your application for the available positions in SMEC.
        </p>
      </div>

      {application && !showSuccessModal ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Your Application Status</h2>
          <p><strong>Name:</strong> {application.name}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Phone:</strong> {application.phone}</p>
          <p><strong>Position:</strong> {application.position}</p>
          {application.subpost && <p><strong>Subpost:</strong> {application.subpost}</p>}
          <p><strong>Status:</strong> <span className="font-semibold text-indigo-600">{application.status}</span></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rollNumber" className="block text-gray-700 font-medium mb-2">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your roll number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="block text-gray-700 font-medium mb-2">Position</label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="" disabled>Select a position</option>
              {positions.map((position) => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>

          {showSubpostField && (
            <div className="mb-4">
              <label htmlFor="subpost" className="block text-gray-700 font-medium mb-2">Subpost</label>
              <select
                id="subpost"
                name="subpost"
                value={formData.subpost}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>Select a subpost</option>
                {subPostOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="additionalDetails" className="block text-gray-700 font-medium mb-2">
              Additional Details (Optional)
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
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

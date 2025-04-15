"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { AppRoutes } from "../../../constant/constant"
import ApplicationStatusCard from "../usercomponents/ApplicationStatusCard"

const ApplyforPosts = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    phone: "",
    email: "",
    position: "",
    subpost: "",
    additionalDetails: "",
  })

  const [activeTab, setActiveTab] = useState("apply")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [applications, setapplications] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
    "E-Games",
    "Geek Gemes",
    "General Games",
  ]

  const subPostPositions = ["E-Games", "Geek Gemes", "General Games"]
  const subPostOptions = ["Lead", "Co-Lead"]
  const showSubpostField = subPostPositions.includes(formData.position)

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user"))
    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
    }))
  }, [])

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    try {
      setIsLoading(true)
      const user = JSON.parse(Cookies.get("user"))
      const userEmail = user.email

      const response = await axios.get(AppRoutes.getapplication, {
        params: { email: userEmail }, // Send email as query parameter
      })
      console.log("response", response.data.data)

      if (response.data.success) {
        const appsArray = Array.isArray(response.data.data) ? response.data.data : [response.data.data]
        setapplications(appsArray)
        setError("")
      } else {
        setapplications(null)
        setError(response.data.message || "No applications found")
      }
    } catch (err) {
      setapplications(null)
      if (err.response?.status === 404) {
        setError("You haven't submitted any applications yet")
      } else {
        setError(err.response?.data?.message || "Error fetching your applications")
        console.error("API Error:", err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      setIsLoading(true)
      const response = await axios.post(AppRoutes.smecpost, formData)

      setIsSubmitted(true)
      setShowSuccessModal(true)
      setapplications(response.data)
      setFormData({
        name: "",
        rollNumber: "",
        phone: "",
        email: "",
        position: "",
        subpost: "",
        additionalDetails: "",
      })

      setTimeout(() => {
        setShowSuccessModal(false)
        setActiveTab("view")
      }, 2000)
    } catch (err) {
      console.error("Submission error:", err)
      setError(err.response?.data?.message || "Something went wrong. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-800">SMEC Posts</h1>
        <p className="text-gray-500 mt-2">
          {activeTab === "apply" ? "Apply for available positions" : "View your applications status"}
        </p>

        <div className="flex border-b mt-4">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "apply" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("apply")}
          >
            Apply for Post
          </button>
          {!applications ? (
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "view" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("view")}
              disabled
            >
              View Applications
            </button>
          ) : (
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "view" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("view")}
            >
              View Applications
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : activeTab === "view" ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Your Applications</h2>

          {applications && applications.length > 0 ? (
            applications.map((app, index) => <ApplicationStatusCard key={index} application={app} />)
          ) : (
            <p>No applications found</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
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
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
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
            <label htmlFor="rollNumber" className="block text-gray-700 font-medium mb-2">
              Roll Number
            </label>
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
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
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
            <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
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

          {showSubpostField && (
            <div className="mb-4">
              <label htmlFor="subpost" className="block text-gray-700 font-medium mb-2">
                Subpost
              </label>
              <select
                id="subpost"
                name="subpost"
                value={formData.subpost}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>
                  Select a subpost
                </option>
                {subPostOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
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
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  )
}

export default ApplyforPosts

import React, { useState } from "react";
import h from "../../../assets/smec_banner.png"

const UserProfile = () => {
  // State to store profile data
  const [profile, setProfile] = useState({
    name: "Rameez",
    rollNo: "2021F-BCS-214",
    university: "",
    email: "rameez123@gmail.com",
    phone: "",
    dob: "",
    language: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    console.log(profile);
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Account</h2>
        <hr className="border-gray-300 mb-6" />

        {/* Profile Section */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
          <p className="text-gray-500 mb-4">
            Following information is publicly displayed, be careful
          </p>
          <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={h}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Upload Profile Picture
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Roll No</label>
              <input
                type="text"
                name="rollNo"
                value={profile.rollNo}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">University</label>
              <input
                type="text"
                name="university"
                value={profile.university}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>
          <p className="text-gray-500 mb-6">
            Manage your personal information, including phone numbers and email address
            where you can be contacted
          </p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Language</label>
              <input
                type="text"
                name="language"
                value={profile.language}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="sm:col-span-2 text-right">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

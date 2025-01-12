import React, { useState } from "react";

const JudgesProfile = () => {
  // States for form inputs
  const [profile, setProfile] = useState({
    name: "Rameez Rafiq",
    email: "rameez123@gmail.com",
    phone: "123-456-7890",
    university: "COMSATS University",
    department: "Computer Science",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission for profile updates
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (profile.newPassword !== profile.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setProfile({ ...profile, password: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500 mt-2">
          Manage your personal information and update your profile details.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!isEditing}
            />
          </div>

          {/* University */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">University</label>
            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!isEditing}
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={profile.department}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!isEditing}
            />
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <button
              type="button"
              onClick={toggleEdit}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Edit Profile
            </button>
          )}

          {/* Save Button */}
          {isEditing && (
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Current Password</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default JudgesProfile;

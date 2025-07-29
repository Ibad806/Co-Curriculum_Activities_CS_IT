import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    rollNo: "",
    university: "",
    email: "",
    phone: "",
    dob: "",
    language: "",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        
        if (data.status) {
          setProfile({
            name: data.data.name || "",
            rollNo: data.data.rollNo || "",
            university: data.data.university || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            dob: data.data.dob || "",
            language: data.data.language || "",
          });
        } else {
          toast.error(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes for profile
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle input changes for password
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Handle profile form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      
      const data = await response.json();
      
      if (data.status) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle password change submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });
      
      const data = await response.json();
      
      if (data.status) {
        toast.success("Password changed successfully!");
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <p className="text-center mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Account</h2>
        <hr className="border-gray-300 mb-6" />

        {/* Profile Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
              <p className="text-gray-500">
                Following information is publicly displayed, be careful
              </p>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-600"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
          
          <div className="flex items-center space-x-6 mb-6">
            {/* Profile Picture */}
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              <div className="bg-gray-300 border-2 border-dashed rounded-xl w-20 h-20" />
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
                disabled={!isEditing}
                className={`w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Roll No</label>
              <input
                type="text"
                name="rollNo"
                value={profile.rollNo}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">University</label>
              <input
                type="text"
                name="university"
                value={profile.university}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              <p className="text-gray-500">
                Manage your personal information, including phone numbers and email address
                where you can be contacted
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full border-gray-300 rounded-lg shadow-sm bg-gray-100"
              />
              <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Language</label>
              <input
                type="text"
                name="language"
                value={profile.language}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
            
            {isEditing && (
              <div className="sm:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-600"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>
        
        {/* Password Change Section */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Password</h3>
            <button 
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              {isChangingPassword ? "Cancel" : "Change Password"}
            </button>
          </div>
          
          {isChangingPassword && (
            <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div></div> {/* Empty div for spacing */}
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  minLength={6}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  minLength={6}
                />
              </div>
              
              <div className="sm:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-600"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
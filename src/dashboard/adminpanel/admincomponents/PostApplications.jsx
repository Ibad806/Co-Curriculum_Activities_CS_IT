import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaEye, FaSort } from "react-icons/fa";
import axios from "axios";
import { AppRoutes } from "../../../constant/constant";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "All",
    sortBy: "date",
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(AppRoutes.smecpost);
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteApplication = async () => {
    try {
      await axios.delete(`${AppRoutes.smecpost}/${appToDelete}`);
      setApplications(applications.filter((app) => app._id !== appToDelete));
      setShowDeleteConfirmation(false);
      toast.success("Application deleted successfully");
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error("Failed to delete application");
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await axios.put(`${AppRoutes.smecpost}/${id}`, { status });
      
      // Update local state
      const updatedApps = applications.map((app) =>
        app._id === id ? { ...app, Status: status } : app
      );

      setApplications(updatedApps);
      setSelectedApp(null); // Close the modal
      toast.success(`Application ${status.toLowerCase()} successfully!`);
    } catch (error) {
      console.error("Failed to update application status:", error);
      toast.error("Failed to update application status");
    }
  };

  const filteredApps = applications.filter(
    (app) =>
      (app.Post || "").toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.status === "All" || app.Status === filters.status)
  );

  const closeModal = () => {
    setSelectedApp(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Applications Management</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
          <span className="text-gray-700">Status:</span>
          <select
            className="bg-transparent border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading applications...</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No applications found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <span className="flex items-center">
                    Name <FaSort className="ml-2 cursor-pointer" />
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApps.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{app.Name}</td>
                  <td className="px-6 py-4">{app.Post}</td>
                  <td className="px-6 py-4">{app.subpost || "Lead"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        app.Status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : app.Status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {app.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Details"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setAppToDelete(app._id);
                          setShowDeleteConfirmation(true);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Application"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold">
                {selectedApp.Name} - {selectedApp.Post}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <p className="flex">
                <strong className="w-32">Name:</strong>
                <span>{selectedApp.Name}</span>
              </p>
              <p className="flex">
                <strong className="w-32">Email:</strong>
                <span>{selectedApp.Email}</span>
              </p>
              <p className="flex">
                <strong className="w-32">Roll Number:</strong>
                <span>{selectedApp.RollNumber}</span>
              </p>
              <p className="flex">
                <strong className="w-32">Position:</strong>
                <span>{selectedApp.Post}</span>
              </p>
              <p className="flex">
                <strong className="w-32">Post:</strong>
                <span>{selectedApp.subpost || "Lead"}</span>
              </p>
              <p className="flex">
                <strong className="w-32">Contact:</strong>
                <span>{selectedApp.ContactNumber}</span>
              </p>
              <p className="flex">
                <strong className="w-32">Status:</strong>
                <span
                  className={`px-2 py-1 rounded ${
                    selectedApp.Status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : selectedApp.Status === "Accepted"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {selectedApp.Status}
                </span>
              </p>
              <div className="mt-2">
                <strong className="block mb-1">Additional Details:</strong>
                <div className="bg-gray-50 p-3 rounded">
                  {selectedApp.AdditionalDetails || "None provided"}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4 border-t pt-4">
              <button
                onClick={() => updateApplicationStatus(selectedApp._id, "Rejected")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedApp.Status === "Rejected"
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
                disabled={selectedApp.Status === "Rejected"}
              >
                Reject
              </button>
              <button
                onClick={() => updateApplicationStatus(selectedApp._id, "Accepted")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedApp.Status === "Accepted"
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                disabled={selectedApp.Status === "Accepted"}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this application? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteApplication}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostApplications;
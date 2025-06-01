import React, { useEffect, useState } from "react";
import { FaSearch, FaFilePdf, FaTrash, FaEye, FaSort } from "react-icons/fa";
import axios from "axios";
import { AppRoutes } from "../../../constant/constant";

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

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(AppRoutes.smecpost);
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  const deleteApplication = async () => {
    try {
      await axios.delete(`${AppRoutes.smecpost}/${appToDelete}`);
      setApplications(applications.filter((app) => app._id !== appToDelete));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      console.log(`Updating application ${id} to status ${status}`);

      await axios.put(`${AppRoutes.smecpost}/${id}`, { status });
      const updatedApps = applications.map((app) =>
        app._id === id ? { ...app, status } : app
      );

      setApplications(updatedApps);

      // Also update the selected application in the modal if it's the same
      if (selectedApp?._id === id) {
        setSelectedApp((prev) => ({ ...prev, status }));
      }
      setSelectedApp(false); // Close the modal after updating
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  const filteredApps = applications.filter(
    (app) =>
      (app.position || "").toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.status === "All" || app.status === filters.status)
  );

  const closeModal = () => {
    setSelectedApp(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Applications Management</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
          <span>Status:</span>
          <select
            className="bg-transparent"
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
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                <span className="flex items-center">
                  Name <FaSort className="ml-2 cursor-pointer" />
                </span>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Position
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Post</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApps.map((app) => (
              <tr key={app._id}>
                <td className="px-6 py-4 font-medium">{app.Name}</td>
                <td className="px-6 py-4">{app.Post}</td>
                <td className="px-6 py-4">{app.subpost}</td>
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
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setAppToDelete(app._id);
                        setShowDeleteConfirmation(true);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {selectedApp.Name} - {selectedApp.Post}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                X
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Name:</strong> {selectedApp.Name}
              </p>
              <p>
                <strong>Email:</strong> {selectedApp.Email}
              </p>
              <p>
                <strong>Roll Number:</strong> {selectedApp.RollNumber}
              </p>
              <p>
                <strong>Position:</strong> {selectedApp.Post}
              </p>
              <p>
                <strong>Post:</strong> {selectedApp.subpost || "Lead"}
              </p>
              <p>
                <strong>Contact:</strong> {selectedApp.ContactNumber}
              </p>
              <p>
                <strong>Additional Details:</strong>{" "}
                {selectedApp.AdditionalDetails}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() =>
                  updateApplicationStatus(selectedApp._id, "Accepted")
                }
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  updateApplicationStatus(selectedApp._id, "Rejected")
                }
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Reject
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
              Are you sure you want to delete this application?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={deleteApplication}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostApplications;

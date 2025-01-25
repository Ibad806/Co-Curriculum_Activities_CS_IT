import React, { useState } from "react";

const AdminUsers = () => {
  // Mock data for demonstration
  const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", registrationDate: "2024-12-15", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", registrationDate: "2024-12-10", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", registrationDate: "2024-11-21", status: "Active" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter users based on search term and status
  const filteredUsers = users.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter ? user.status === statusFilter : true)
  );

  // Function to toggle user status
  const toggleStatus = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
    );
    setUsers(updatedUsers);
  };

  // Function to delete a user
  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600 mt-2">
          Manage registered users on the platform.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg flex-grow"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* User List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-4 font-bold text-gray-800">Name</th>
              <th className="pb-4 font-bold text-gray-800">Email</th>
              <th className="pb-4 font-bold text-gray-800">Registration Date</th>
              <th className="pb-4 font-bold text-gray-800">Status</th>
              <th className="pb-4 font-bold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.registrationDate}</td>
                <td className="py-2">{user.status}</td>
                <td className="py-2 flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => toggleStatus(user.id)}>
                    Toggle Status
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Users Found */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

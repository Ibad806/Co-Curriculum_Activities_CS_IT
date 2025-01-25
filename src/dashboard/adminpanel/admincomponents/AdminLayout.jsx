import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <AdminHeader />

      {/* Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar />
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 ml-64">
          <Outlet /> {/* Render respective pages */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

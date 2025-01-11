import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar  ";

const UserLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <UserHeader />

        {/* Dynamic Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          <Outlet /> {/* This renders the child components dynamically */}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

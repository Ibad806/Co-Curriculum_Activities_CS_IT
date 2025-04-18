import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";
import UserHome from "../userpages/UserHome";

const UserPanel = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <UserHeader />

      {/* Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar />
        {/* <UserHome /> */}
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 ml-64">
          <Outlet /> {/* Dynamically renders child routes */}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;

import React from "react";
import { Outlet } from "react-router-dom";
import JudgesHeader from "./JudgesHeader";
import JudgesSidebar from "./JudgesSidebar";

const JudgesLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <JudgesHeader />

      {/* Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <JudgesSidebar />
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 ml-64">
          <Outlet /> {/* Render respective pages */}
        </div>
      </div>
    </div>
  );
};

export default JudgesLayout;

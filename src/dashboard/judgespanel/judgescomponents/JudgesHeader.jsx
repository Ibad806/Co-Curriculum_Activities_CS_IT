import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import h from "../../../assets/smec_banner.png";

const JudgesHeader = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10 ml-64">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Judge Dashboard</h1>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <AiOutlineBell className="text-2xl text-gray-700 cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src={h} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-gray-800 font-medium">Ibad</p>
            <p className="text-gray-500 text-sm">Judge</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default JudgesHeader;

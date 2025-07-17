import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full h-full bg-white shadow-md flex items-center justify-between p-5 sticky top-0 z-50">
      <h1 className="text-xl font-semibold text-gray-800">SOC Dashboard</h1>

      <div className="relative flex items-center gap-4">
        <FaUserCircle className="text-3xl text-gray-600 cursor-pointer" />

        <span className="text-sm text-gray-600 hidden sm:inline">User</span>
      </div>
    </div>
  );
};

export default Header;

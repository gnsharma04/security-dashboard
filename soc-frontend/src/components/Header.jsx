import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DateFilter from "./DateFilter";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between p-5 sticky top-0 z-50">
      <h1 className="text-xl font-semibold text-gray-800">
        Security Operations Center
      </h1>

      <div className="flex items-center">
        <DateFilter />

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <FaUserCircle className="text-3xl text-gray-600" />
            <span className="text-sm text-gray-600 hidden sm:inline">User</span>
            <KeyboardArrowDownIcon
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              } text-gray-600`}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden transform transition-all duration-200 origin-top ${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
        >
          <ul className="text-sm text-gray-700 divide-y divide-gray-100">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

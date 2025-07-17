import { Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import sidebarConstanst from "../constants/Sidebar.Constants";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen rounded-tr-lg rounded-br-lg shadow-2xl relative flex flex-col justify-center`}
      >
        <MdMenu
          onClick={toggleDrawer}
          className={`absolute cursor-pointer text-3xl top-7 ml-7 text-black ${
            open ? "transform rotate-180 duration-300" : "duration-300"
          }`}
        />

        <div className="mt-24 flex-grow">
          {sidebarConstanst.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              open={open}
              path={item.path}
              active={location.pathname === item.path}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

const SidebarItem = ({ icon: Icon, text, open, path, onClick, active }) => {
  return (
    <Tooltip
      title={text}
      placement="right"
      arrow
      disableHoverListener={!open ? false : true}
    >
      <Link
        to={path}
        onClick={onClick}
        className={`flex items-center ${
          open ? "justify-start px-4 gap-4" : "justify-center"
        } mt-2 py-3 mx-2 rounded-lg transition-all duration-300 hover:bg-blue-200 cursor-pointer ${
          active ? "bg-blue-300" : ""
        }`}
      >
        <div>
          <Icon className="text-2xl" />
        </div>
        {open && (
          <span className={`text-base font-medium whitespace-nowrap`}>
            {text}
          </span>
        )}
      </Link>
    </Tooltip>
  );
};

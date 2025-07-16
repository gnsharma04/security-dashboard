import React from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { Box } from "@mui/material";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Box className="flex h-screen">
        <Sidebar />
        <Box className="flex flex-col flex-grow bg-gray-100">
          <Header />
          <Box className="p-6">
            <h2 className="text-2xl font-semibold">
              Welcome to the SOC Dashboard
            </h2>
            <p className="mt-2 text-gray-600">
              This is where your charts and logs will appear.
            </p>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;

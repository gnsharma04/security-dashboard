import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Box className="flex h-screen">
      <Toaster position="top-right" />
      <Sidebar />
      <Box className="flex flex-col flex-grow bg-gray-100 overflow-y-auto">
        <Header />
        <Box component="main" className="p-4">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default App;

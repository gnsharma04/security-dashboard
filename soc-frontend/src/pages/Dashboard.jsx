import { Grid, Box } from "@mui/material";
import React from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import LogsTable from "../components/LogsTable";
import { headers, keys } from "../constants/table.Constants";

const Dashboard = () => {
  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Half: BarChart and LineChart */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <BarChart />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <LineChart />
          </div>
        </div>

        {/* Right Half: LogsTable */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-4">
          <LogsTable tableHeaders={headers} keys={keys} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

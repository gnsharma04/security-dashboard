import { Grid, Box } from "@mui/material";
import React from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import LogsTable from "../components/LogsTable";
import { headers, keys } from "../constants/table.Constants";

const Dashboard = () => {
  return (
    <Box p={3}>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Charts Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BarChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart />
        </Grid>
      </Grid>

      {/* Table Section */}
      <Box mt={4}>
        <LogsTable tableHeaders={headers} keys={keys} />
      </Box>
    </Box>
  );
};

export default Dashboard;

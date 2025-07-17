import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { GET_EVENT_COUNT } from "../constants/endpoints";
import { toast } from "react-hot-toast";

// Chart.js modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [eventCounts, setEventCounts] = useState({});

  useEffect(() => {
    const fetchEventCounts = async () => {
      try {
        const response = await axios.get(GET_EVENT_COUNT);
        if (response.status === 200) {
          toast.success("Event counts fetched successfully");
          setEventCounts(response.data);
        } else {
          toast.error(
            "Failed to fetch event counts, Error Code:",
            response.status
          );
        }
      } catch (error) {
        console.error("BarChart API error:", error);
      }
    };

    fetchEventCounts();
  }, []);

  const chartData = {
    labels: Object.keys(eventCounts),
    datasets: [
      {
        label: "Event Count",
        data: Object.values(eventCounts),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Events by Type</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;

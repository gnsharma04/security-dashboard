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
import { colors } from "../constants/barColour.constants";
import { useAtom } from "jotai";
import {
  dateRangeAtom,
  formatDateLocale,
} from "../constants/Sidebar.Constants";

// Chart.js modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [dateRange] = useAtom(dateRangeAtom);

  const [eventCounts, setEventCounts] = useState({});

  const fetchEventCounts = async () => {
    try {
      const config = dateRange
        ? {
            params: {
              startDate: formatDateLocale(dateRange.startDate),
              endDate: formatDateLocale(dateRange.endDate),
            },
          }
        : {};
      const response = await axios.get(GET_EVENT_COUNT, config);
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

  useEffect(() => {
    fetchEventCounts();
  }, [dateRange]);

  const chartData = {
    labels: Object.keys(eventCounts),
    datasets: [
      {
        data: Object.values(eventCounts),
        backgroundColor: Object.values(eventCounts).map(
          (_, i) => colors[i % colors.length]
        ),
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false, position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Events by Type</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;

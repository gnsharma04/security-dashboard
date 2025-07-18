import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { GET_EVENTS_BY_HOUR } from "../constants/endpoints";
import { toast } from "react-hot-toast";
import {
  dateRangeAtom,
  formatDateLocale,
} from "../constants/Sidebar.Constants";
import { useAtom } from "jotai";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [dateRange] = useAtom(dateRangeAtom);
  const [eventData, setEventData] = useState({});

  const fetchEventData = async () => {
    try {
      const config = dateRange
        ? {
            params: {
              startDate: formatDateLocale(dateRange.startDate),
              endDate: formatDateLocale(dateRange.endDate),
            },
          }
        : {};
      const response = await axios.get(GET_EVENTS_BY_HOUR, config);
      if (response.status === 200) {
        setEventData(response.data);
        toast.success("Events by hour fetched");
      } else {
        toast.error(`Failed to fetch: ${response.status}`);
      }
    } catch (error) {
      console.error("LineChart API error:", error);
      toast.error("Failed to fetch line chart data");
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [dateRange]);

  const chartData = {
    labels: Object.keys(eventData).map((isoTime) => {
      const localTime = new Date(isoTime.replace(" ", "T") + ":00Z");
      return localTime.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }),
    datasets: [
      {
        label: "Events Over Time",
        data: Object.values(eventData),
        fill: false,
        borderColor: "rgba(59, 130, 246, 1)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Time" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Event Count" },
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Events Over Time</h2>
      <Line data={chartData} options={chartOptions} />
    </>
  );
};

export default LineChart;

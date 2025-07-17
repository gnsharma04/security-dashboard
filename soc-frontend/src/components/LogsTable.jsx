import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { GET_LOGS } from "../constants/endpoints";

const LogsTable = ({ tableHeaders, keys }) => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const fetchLogs = async () => {
    try {
      const response = await axios.get(GET_LOGS, {
        params: {
          page: page,
          limit: limit,
        },
      });

      if (response.status === 200) {
        setLogs(response.data.logs || []);
        setTotalPages(response.data.totalPages || 1);
        toast.success("Logs fetched successfully");
      } else {
        toast.error(`Failed to fetch logs. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Logs API error:", error);
      toast.error("Error fetching logs");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const formatIST = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Log Events</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              {tableHeaders.map((header, index) => (
                <th key={index} className="px-4 py-2 border-b font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={keys.length}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No log entries available.
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50 text-sm">
                  {keys.map((key, i) => (
                    <td key={i} className="px-4 py-2 border-b">
                      {key === "timestamp" ? formatIST(log[key]) : log[key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LogsTable;

const express = require("express");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const router = express.Router();

// Reading the log file
const logFilePath = path.join(__dirname, "..", "siem_logs.json");
let logs = [];

try {
  const raw = fs.readFileSync(logFilePath, "utf-8");
  logs = JSON.parse(raw);
} catch (err) {
  console.error("❌ Failed to read log file:", err);
}

//Date Parser
function parseDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

// GET /api/logs
router.get("/logs", (req, res) => {
  const { page = 1, limit = 20, startDate, endDate } = req.query;
  let filteredLogs = [...logs];

  if (startDate && endDate) {
    const start = parseDate(startDate);
    start.setHours(0, 0, 0, 0);

    const end = parseDate(endDate);
    end.setHours(23, 59, 59, 999);

    filteredLogs = filteredLogs.filter((log) => {
      const logTime = new Date(log.timestamp);
      return logTime >= start && logTime <= end;
    });
  }

  filteredLogs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);
  const startIndex = (pageInt - 1) * limitInt;
  const paginatedLogs = filteredLogs
    .slice(startIndex, startIndex + limitInt)
    .map((log) => ({
      ...log,
      timeAgo: dayjs(log.timestamp).fromNow(),
    }));

  res.json({
    page,
    limit,
    total: filteredLogs.length,
    totalPages: Math.ceil(filteredLogs.length / limit),
    logs: paginatedLogs,
  });
});

// GET /api/event-count
router.get("/event-count", (req, res) => {
  const { startDate, endDate } = req.query;

  let filteredLogs = logs;

  if (startDate && endDate) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    filteredLogs = logs.filter((log) => {
      const logTime = new Date(log.timestamp);
      return logTime >= start && logTime <= end;
    });
  }

  const counts = {};

  filteredLogs.forEach((log) => {
    const type = log.event_type;
    counts[type] = (counts[type] || 0) + 1;
  });

  res.json(counts);
});

// GET /api/events-by-hour
router.get("/events-by-hour", (req, res) => {
  const { startDate, endDate } = req.query;

  let filteredLogs = logs;

  if (startDate && endDate) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    filteredLogs = logs.filter((log) => {
      const logTime = new Date(log.timestamp);
      return logTime >= start && logTime <= end;
    });
  }

  const eventsByHour = {};

  filteredLogs.forEach((log) => {
    const date = new Date(log.timestamp);

    const hourKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:00`;

    eventsByHour[hourKey] = (eventsByHour[hourKey] || 0) + 1;
  });

  const sorted = Object.keys(eventsByHour)
    .sort()
    .reduce((obj, key) => {
      obj[key] = eventsByHour[key];
      return obj;
    }, {});

  res.json(sorted);
});

module.exports = router;
